/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                "inner-custom": "1px 8px 5px #dddfe2;",
            },
            screens: {
                'xs': '0',
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};