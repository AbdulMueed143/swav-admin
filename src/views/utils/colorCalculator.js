function colorNameAndWeight(hex) {
    const rgb = hexToRgb(hex);
    const lum = luminance(rgb.r, rgb.g, rgb.b);

    // This is an example and should be expanded with more colors and refined
    const colors = [
        { name: 'black', r: 0, g: 0, b: 0 },
        { name: 'white', r: 255, g: 255, b: 255 },
        // ... add more named colors with their typical RGB values
    ];

    // Find the closest named color
    let closestColor = null;
    let minDistance = Number.MAX_VALUE;
    colors.forEach(color => {
        const distance = Math.sqrt(Math.pow(color.r - rgb.r, 2) + Math.pow(color.g - rgb.g, 2) + Math.pow(color.b - rgb.b, 2));
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color.name;
        }
    });

    // Assign a weight number based on luminance
    const weight = lum < 0.5 ? 600 : 400; // Example logic

    return { name: closestColor, weight };
}


function stringToHash(str) {
    console.log("Inside String To Hash");

    console.log(str);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function hashToColor(hash) {
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}


function idToColor(id) {
    const hash = stringToHash(id);
    return hashToColor(hash);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


export { idToColor, hexToRgb };
