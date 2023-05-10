<?php

add_action( 'after_setup_theme', 'twentytwentytwo_support' );


add_action( 'wp_enqueue_scripts', 'twentytwentytwo_styles' );

// Add block patterns
require get_template_directory() . '/inc/block-patterns.php';
