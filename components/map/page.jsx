import React from 'react';

export default function Map() {
    return (
        <div>
            <iframe
                className="map-wrapper embed-responsive-item"
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.9659000191664!2d31.807123715148048!3d31.415065581404594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9e57d9fa70e39%3A0x7f2f3f6aaef6cabf!2sSamah%20elkasem!5e0!3m2!1sen!2seg!4v1612797255730!5m2!1sen!2seg"
                title="Google Map"
            ></iframe>
        </div>
    );
}
