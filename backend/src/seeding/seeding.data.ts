import { RecipeDifficulty } from 'src/enums/RecipeDifficulty';

export const MOCK_PASSWORD = 'Senha123!';

export const MOCK_USERS = [
    {
        name: 'Ana Cozinha',
        email: 'ana@cademeurango.com',
        avatar_url: 'https://i.pravatar.cc/150?u=ana',
    },
    {
        name: 'Bruno Sabor',
        email: 'bruno@cademeurango.com',
        avatar_url: 'https://i.pravatar.cc/150?u=bruno',
    },
    {
        name: 'Carla Tempero',
        email: 'carla@cademeurango.com',
        avatar_url: 'https://i.pravatar.cc/150?u=carla',
    },
];

export const MOCK_CATEGORIES = [
    'Café da manhã',
    'Almoço',
    'Jantar',
    'Sobremesa',
    'Lanche',
];

export type MockRecipe = {
    title: string;
    description: string;
    image_url: string;
    difficulty: RecipeDifficulty;
    durationMinutes: number;
    tools: string[];
    ingredients: string[];
    instructions: string[];
    categoryNames: string[];
    authorEmail: string;
};

export const MOCK_RECIPES: MockRecipe[] = [
    {
        title: 'Pão de queijo mineiro',
        description: 'Clássico mineiro crocante por fora e macio por dentro.',
        image_url:
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 40,
        tools: ['panela', 'tigela', 'forma de assar', 'colher de pau'],
        ingredients: [
            '500g de polvilho azedo',
            '250ml de leite',
            '100ml de óleo',
            '2 ovos',
            '200g de queijo minas ralado',
            'Sal a gosto',
        ],
        instructions: [
            'Ferva o leite com o óleo e o sal.',
            'Despeje sobre o polvilho e misture bem.',
            'Espere esfriar, acrescente os ovos e o queijo.',
            'Modele bolinhas e asse a 180°C por 25 minutos.',
        ],
        categoryNames: ['Café da manhã', 'Lanche'],
        authorEmail: 'ana@cademeurango.com',
    },
    {
        title: 'Strogonoff de frango',
        description: 'Cremoso, rápido e perfeito para o almoço de semana.',
        image_url:
            'https://images.unsplash.com/photo-1604908177856-541c7d8d3e0c?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 30,
        tools: ['frigideira', 'faca', 'táboa de corte', 'colher'],
        ingredients: [
            '500g de peito de frango',
            '1 cebola picada',
            '2 dentes de alho',
            '1 lata de creme de leite',
            '2 colheres de ketchup',
            '1 colher de mostarda',
            'Sal e pimenta a gosto',
        ],
        instructions: [
            'Refogue cebola e alho no óleo.',
            'Adicione o frango em cubos e doure.',
            'Tempere, acrescente ketchup e mostarda.',
            'Desligue o fogo e misture o creme de leite.',
        ],
        categoryNames: ['Almoço', 'Jantar'],
        authorEmail: 'bruno@cademeurango.com',
    },
    {
        title: 'Brigadeiro de colher',
        description: 'Sobremesa rápida para matar a vontade de doce.',
        image_url:
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 20,
        tools: ['panela antiaderente', 'colher de pau', 'potinhos'],
        ingredients: [
            '1 lata de leite condensado',
            '2 colheres de chocolate em pó',
            '1 colher de manteiga',
            'Granulado a gosto',
        ],
        instructions: [
            'Misture tudo em fogo baixo.',
            'Mexa até desgrudar do fundo da panela.',
            'Sirva em potinhos com granulado.',
        ],
        categoryNames: ['Sobremesa'],
        authorEmail: 'carla@cademeurango.com',
    },
    {
        title: 'Omelete de espinafre',
        description: 'Leve, proteica e pronta em poucos minutos.',
        image_url:
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 15,
        tools: ['frigideira', 'fouet', 'espátula'],
        ingredients: [
            '3 ovos',
            '1 xícara de espinafre',
            '50g de queijo',
            'Sal e pimenta a gosto',
        ],
        instructions: [
            'Bata os ovos e tempere.',
            'Refogue o espinafre rapidamente.',
            'Despeje os ovos, adicione o queijo e dobre a omelete.',
        ],
        categoryNames: ['Café da manhã', 'Jantar'],
        authorEmail: 'ana@cademeurango.com',
    },
    {
        title: 'Feijão tropeiro',
        description: 'Receita mineira reforçada, ótima para o almoço.',
        image_url:
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Medium,
        durationMinutes: 50,
        tools: ['panela grande', 'faca', 'táboa de corte', 'colher de pau'],
        ingredients: [
            '500g de feijão cozido',
            '200g de bacon',
            '150g de linguiça calabresa',
            '2 ovos',
            '1 cebola picada',
            '2 dentes de alho',
            'Farinha de mandioca a gosto',
            'Cheiro-verde a gosto',
        ],
        instructions: [
            'Frite o bacon e a linguiça até dourar.',
            'Refogue cebola e alho na mesma panela.',
            'Adicione o feijão e misture.',
            'Acrescente farinha de mandioca, ovos mexidos e cheiro-verde.',
        ],
        categoryNames: ['Almoço'],
        authorEmail: 'bruno@cademeurango.com',
    },
    {
        title: 'Moqueca de peixe',
        description: 'Peixe no leite de coco com dendê, sabor de litoral.',
        image_url:
            'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Medium,
        durationMinutes: 45,
        tools: ['panela de barro ou funda', 'faca', 'táboa de corte'],
        ingredients: [
            '800g de peixe em postas',
            '2 tomates fatiados',
            '1 pimentão',
            '1 cebola',
            '200ml de leite de coco',
            '2 colheres de azeite de dendê',
            'Coentro a gosto',
            'Sal e limão a gosto',
        ],
        instructions: [
            'Tempere o peixe com sal e limão.',
            'Monte camadas de peixe, tomate, cebola e pimentão.',
            'Cubra com leite de coco e dendê.',
            'Cozinhe em fogo baixo por 20 minutos e finalize com coentro.',
        ],
        categoryNames: ['Almoço', 'Jantar'],
        authorEmail: 'carla@cademeurango.com',
    },
    {
        title: 'Banana caramelizada',
        description: 'Sobremesa rápida com banana, manteiga e açúcar.',
        image_url:
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 15,
        tools: ['frigideira', 'espátula', 'faca'],
        ingredients: [
            '4 bananas maduras',
            '3 colheres de açúcar',
            '1 colher de manteiga',
            'Canela a gosto',
        ],
        instructions: [
            'Derreta a manteiga com o açúcar até caramelizar.',
            'Adicione as bananas cortadas ao meio.',
            'Cozinhe alguns minutos e polvilhe canela.',
        ],
        categoryNames: ['Sobremesa', 'Lanche'],
        authorEmail: 'ana@cademeurango.com',
    },
    {
        title: 'Macarrão alho e óleo',
        description: 'Clássico italiano simples para o jantar corrido.',
        image_url:
            'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 25,
        tools: ['panela', 'frigideira', 'pegador de macarrão'],
        ingredients: [
            '400g de espaguete',
            '6 dentes de alho fatiados',
            '80ml de azeite',
            'Pimenta calabresa a gosto',
            'Salsinha e sal a gosto',
        ],
        instructions: [
            'Cozinhe o macarrão al dente.',
            'Doure o alho no azeite com a pimenta.',
            'Misture o macarrão escorrido e finalize com salsinha.',
        ],
        categoryNames: ['Jantar'],
        authorEmail: 'bruno@cademeurango.com',
    },
    {
        title: 'Vitamina de banana com aveia',
        description: 'Bebida rápida para começar o dia com energia.',
        image_url:
            'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
        difficulty: RecipeDifficulty.Easy,
        durationMinutes: 5,
        tools: ['liquidificador', 'copo'],
        ingredients: [
            '2 bananas',
            '300ml de leite',
            '3 colheres de aveia',
            '1 colher de mel',
            'Gelo a gosto',
        ],
        instructions: [
            'Coloque todos os ingredientes no liquidificador.',
            'Bata até ficar cremoso.',
            'Sirva imediatamente.',
        ],
        categoryNames: ['Café da manhã', 'Lanche'],
        authorEmail: 'carla@cademeurango.com',
    },
];

export type MockTip = {
    title: string;
    description: string;
    authorEmail: string;
};

export const MOCK_TIPS: MockTip[] = [
    {
        title: 'Salve a cebola sem chorar',
        description:
            'Deixe a cebola na geladeira por 15 minutos antes de cortar. O frio reduz a liberação dos compostos que irritam os olhos.',
        authorEmail: 'ana@cademeurango.com',
    },
    {
        title: 'Arroz soltinho sempre',
        description:
            'Lave o arroz até a água sair limpa e use a proporção de 1 xícara de arroz para 2 de água. Não mexa depois de ferver.',
        authorEmail: 'bruno@cademeurango.com',
    },
    {
        title: 'Conserve ervas frescas',
        description:
            'Enrole salsinha e coentro em papel toalha levemente úmido e guarde em pote fechado na geladeira. Duram bem mais.',
        authorEmail: 'carla@cademeurango.com',
    },
    {
        title: 'Amacie a carne rápido',
        description:
            'Uma pitada de bicarbonato na carne por 15 minutos antes de temperar ajuda a amaciar sem alterar o sabor.',
        authorEmail: 'bruno@cademeurango.com',
    },
];
