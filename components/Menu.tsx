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
        title: "Logs",
        icon: "newspaper",
        route: "Logs",
    },
        {
        title: "Importar Dados",
        icon: "book",
        route: "ImportCSV",
    },
    // {
    //     title: "Sair",
    //     icon: "exit-outline",
    //     route: "Login",
    // },
];

export default Menu