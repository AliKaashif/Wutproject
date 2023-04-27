<?php
/**
 * Plugin Name: My RESTful API
 * Description: A custom plugin to create a RESTful API for contacts management
 * Version: 1.0
 * Author: ali
 */

// Register custom post type for contacts
function my_restful_api_create_contact_post_type() {
    register_post_type('contact', [
        'public' => true,
        'label' => 'Contacts',
        'show_in_rest' => true,
        'supports' => ['title', 'custom-fields'],
    ]);
}
add_action('init', 'my_restful_api_create_contact_post_type');

// Register custom REST API routes
function my_restful_api_register_routes() {
    // Get all contacts
    register_rest_route('my_restful_api/v1', '/contacts', [
        'methods' => 'GET',
        'callback' => 'my_restful_api_get_contacts',
    ]);

    // Add new contact
    register_rest_route('my_restful_api/v1', '/contacts', [
        'methods' => 'POST',
        'callback' => 'my_restful_api_add_contact',
    ]);

    // Update contact
    register_rest_route('my_restful_api/v1', '/contacts/(?P<id>\d+)', [
        'methods' => 'PUT',
        'callback' => 'my_restful_api_update_contact',
    ]);

    // Delete contact
    register_rest_route('my_restful_api/v1', '/contacts/(?P<id>\d+)', [
        'methods' => 'DELETE',
        'callback' => 'my_restful_api_delete_contact',
    ]);
}
add_action('rest_api_init', 'my_restful_api_register_routes');

// Helper functions
function my_restful_api_get_contacts() {
    $contacts = get_posts([
        'post_type' => 'contact',
        'posts_per_page' => -1,
        'order' => 'ASC',
        'orderby' => 'title',
    ]);

    $data = [];

    foreach ($contacts as $contact) {
        $data[] = [
            'id' => $contact->ID,
            'first_name' => get_post_meta($contact->ID, 'first_name', true),
            'last_name' => get_post_meta($contact->ID, 'last_name', true),
            'email' => get_post_meta($contact->ID, 'email', true),
            'phone' => get_post_meta($contact->ID, 'phone', true),
            'image_url' => get_the_post_thumbnail_url($contact->ID),
        ];
    }

    return rest_ensure_response($data);
}

function my_restful_api_add_contact(WP_REST_Request $request) {
    $params = $request->get_params();

    $post_id = wp_insert_post([
        'post_title' => $params['first_name'] . ' ' . $params['last_name'],
        'post_type' => 'contact',
        'post_status' => 'publish',
    ]);

    if (!$post_id) {
        return new WP_Error('error', 'Failed to create contact', ['status' => 500]);
    }

    update_post_meta($post_id, 'first_name', $params['first_name']);
    update_post_meta($post_id, 'last_name', $params['last_name']);
    update_post_meta($post_id, 'email', $params['email']);
    update_post_meta($post_id, 'phone', $params['phone']);

    $image_url = my_restful_api_upload_image($_FILES['image']);

    if ($image_url) {
        set_post_thumbnail($post_id, $image_url);
    }

    return rest_ensure_response([
        'id' => $post_id,
        'first_name' => $params['first_name'],
        'last_name' => $params['last_name'],
        'email' => $params['email'],
        'phone' => $params['phone'],
        'image_url' => $image_url,
    ]);
}

function my_restful_api_update_contact(WP_REST_Request $request) {
    $params = $request->get_params();

    $post_id = $params['id'];

    $post = get_post($post_id);

    if (!$post) {
        return new WP_Error('error', 'Contact not found', ['status' => 404]);
    }

    wp_update_post([
        'ID' => $post_id,
        'post_title' => $params['first_name'] . ' ' . $params['last_name'],
    ]);

    update_post_meta($post_id, 'first_name', $params['first_name']);
    update_post_meta($post_id, 'last_name', $params['last_name']);
    update_post_meta($post_id, 'email', $params['email']);
    update_post_meta($post_id, 'phone', $params['phone']);

    $image_url = my_restful_api_upload_image($_FILES['image']);

    if ($image_url) {
        set_post_thumbnail($post_id, $image_url);
    }

    return rest_ensure_response([
        'id' => $post_id,
        'first_name' => $params['first_name'],
        'last_name' => $params['last_name'],
        'email' => $params['email'],
        'phone' => $params['phone'],
        'image_url' => $image_url,
    ]);
}

function my_restful_api_delete_contact(WP_REST_Request $request) {
    $params = $request->get_params();

    $post_id = $params['id'];

    $post = get_post($post_id);

    if (!$post) {
        return new WP_Error('error', 'Contact not found', ['status' => 404]);
    }

    $result = wp_delete_post($post_id, true);

    if ($result) {
        return rest_ensure_response([
            'success' => true,
        ]);
    } else {
        return new WP_Error('error', 'Failed to delete contact', ['status' => 500]);
    }
}

function my_restful_api_upload_image($file) {
    if (!$file || !isset($file['name']) || empty($file['name'])) {
        return null;
    }

    $upload_dir = wp_upload_dir();
    $target_dir = $upload_dir['path'];

    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $file_name = uniqid() . '_' . basename($file['name']);
    $target_file = $target_dir . '/' . $file_name;

    if (!move_uploaded_file($file['tmp_name'], $target_file)) {
        return null;
    }

    return $upload_dir['url'] . '/' . $file_name;
}