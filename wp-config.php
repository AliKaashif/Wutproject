<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dev_testserver' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'P*Bx#~mqk{@?LPofshOSRFo-XX8+I_:H3p{TstWS6e~%W)yZZA+2:,VClK|R[+R9' );
define( 'SECURE_AUTH_KEY',  '5fl-xVO+]1>sRgJ^SY]x#DpLyh-gyd?C=u@Inv~h{Z[5O$9@sAST0FlOEBY-264&' );
define( 'LOGGED_IN_KEY',    'ne7G;k5=!~Q^p>v?V?z{K~ox%;Er|E9j~PtC*dHnpV`c&F/UP*Z#=m=cP5O=!YmR' );
define( 'NONCE_KEY',        'ac|_D)Q2%d3 kI)k/wm8{pzf9gTtF|HSpumore;E36o&]~Jf]NiDum_Jky3P^c$>' );
define( 'AUTH_SALT',        'ZByX3D$WP3>Qq4S_X-I@RFy&u`Q27%8`:$$KRo0^Ov_|J3B#8uB#4+E*NR:e+g/)' );
define( 'SECURE_AUTH_SALT', 'oaK -B~fa`uzzG!Lpl*&kPhC71]t9_MkU/LUu:U2 (7k>dqSdKKrm%~rQ9df)d^B' );
define( 'LOGGED_IN_SALT',   'EvJ2y5V[Z/m3:ggiO^8BP@[RP6 [!-$uQRRTdlfRh{tb`d&d4vs+LbpOti?(Y:[C' );
define( 'NONCE_SALT',       '~|c1 F|#}80me<=`. S;7t0lEiE_HxPABtqy0c :NZ%43P^K)g2lX+[en5iRT8[@' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
