const Menu = [
    {
        title: "Cadastros",
        icon: "document-text",
        subItems: [
            { title: "Áreas", route: "AreaList" },
            { title: "Pessoas", route: "PersonList" },
            { title: "Produtos", route: "ProductList" },
        ],
    },
    {
        title: "Inventários",
        icon: "clipboard",
        route: "InventoryScreen",
    },
    {
        title: "Logs",
        icon: "newspaper",
        route: "Logs",
    },
    {
        title: "Sair",
        icon: "exit-outline",
        route: "Login",
    },
];

export default Menu