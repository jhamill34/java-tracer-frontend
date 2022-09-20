/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#14b8a6",
                secondary: "#fef3c7",
                dark: "#27272a",
                light: "#fafafa",
            },
            fontFamily: {
                mono: ['"Fira Code"', "Monaco", '"Courier New"', "monospace"],
            },
        },
    },
    plugins: [],
}
