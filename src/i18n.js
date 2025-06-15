import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      // Navigation
      "nav.home": "Início",
      "nav.about": "Sobre",
      "nav.offers": "Ofertas",
      "nav.requests": "Pedidos",
      "nav.contact": "Contato",
      "nav.login": "Entrar",
      "nav.register": "Cadastrar",
      "nav.dashboard": "Painel",
      "nav.profile": "Perfil",
      "nav.logout": "Sair",
      
      // Hero Section
      "hero.title": "Conectando Vidas, Transformando Futuros",
      "hero.subtitle": "Uma plataforma que une pessoas em vulnerabilidade com apoiadores dispostos a ajudar. Juntos, construímos uma sociedade mais justa e solidária.",
      "hero.cta.primary": "Começar Agora",
      "hero.cta.secondary": "Saiba Mais",
      
      // Features
      "features.title": "Como Funciona",
      "features.subtitle": "Nossa plataforma conecta quem precisa com quem pode ajudar",
      "features.help.title": "Peça Ajuda",
      "features.help.description": "Crie seu perfil e descreva suas necessidades. Nossa comunidade está pronta para apoiar.",
      "features.offer.title": "Ofereça Apoio",
      "features.offer.description": "Seja uma pessoa física, ONG ou empresa. Sua ajuda pode transformar vidas.",
      "features.connect.title": "Conecte-se",
      "features.connect.description": "Sistema seguro de mensagens e avaliações para conexões confiáveis.",
      
      // Stats
      "stats.users": "Usuários Ativos",
      "stats.offers": "Ofertas de Ajuda",
      "stats.connections": "Conexões Realizadas",
      "stats.cities": "Cidades Atendidas",
      
      // About
      "about.title": "Sobre o IntegrAção",
      "about.description": "Baseado nas ODS 3, 4, 8 e 10 da ONU, o IntegrAção é uma plataforma digital que conecta pessoas em situação de vulnerabilidade com apoiadores.",
      "about.mission": "Nossa missão é criar uma rede de solidariedade que promova saúde, educação, trabalho digno e redução das desigualdades.",
      
      // Forms
      "form.name": "Nome",
      "form.email": "Email",
      "form.password": "Senha",
      "form.confirmPassword": "Confirmar Senha",
      "form.phone": "Telefone",
      "form.city": "Cidade",
      "form.state": "Estado",
      "form.bio": "Biografia",
      "form.submit": "Enviar",
      "form.cancel": "Cancelar",
      
      // User Types
      "userType.vulnerable": "Pessoa em Vulnerabilidade",
      "userType.supporter": "Apoiador",
      "userType.admin": "Administrador",
      
      // Help Types
      "helpType.housing": "Moradia",
      "helpType.job": "Emprego",
      "helpType.health": "Saúde",
      "helpType.education": "Educação",
      "helpType.legal": "Jurídico",
      "helpType.psychological": "Psicológico",
      "helpType.dental": "Dentário",
      "helpType.donation": "Doação",
      "helpType.emotional": "Apoio Emocional",
      "helpType.course": "Curso",
      "helpType.other": "Outros",
      
      // Messages
      "message.success": "Operação realizada com sucesso!",
      "message.error": "Ocorreu um erro. Tente novamente.",
      "message.loading": "Carregando...",
      "message.noData": "Nenhum dado encontrado.",
      
      // Chat
      "chat.title": "Chat",
      "chat.placeholder": "Digite sua mensagem...",
      "chat.send": "Enviar",
      "chat.online": "Online",
      "chat.offline": "Offline",
      
      // Dashboard
      "dashboard.welcome": "Bem-vindo(a)",
      "dashboard.myOffers": "Minhas Ofertas",
      "dashboard.myRequests": "Meus Pedidos",
      "dashboard.messages": "Mensagens",
      "dashboard.evaluations": "Avaliações",
      
      // Footer
      "footer.description": "IntegrAção - Conectando vidas e transformando futuros através da solidariedade.",
      "footer.links": "Links Úteis",
      "footer.contact": "Contato",
      "footer.social": "Redes Sociais",
      "footer.rights": "Todos os direitos reservados."
    }
  },
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.offers": "Offers",
      "nav.requests": "Requests",
      "nav.contact": "Contact",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.dashboard": "Dashboard",
      "nav.profile": "Profile",
      "nav.logout": "Logout",
      
      // Hero Section
      "hero.title": "Connecting Lives, Transforming Futures",
      "hero.subtitle": "A platform that connects vulnerable people with supporters willing to help. Together, we build a more just and caring society.",
      "hero.cta.primary": "Get Started",
      "hero.cta.secondary": "Learn More",
      
      // Features
      "features.title": "How It Works",
      "features.subtitle": "Our platform connects those in need with those who can help",
      "features.help.title": "Ask for Help",
      "features.help.description": "Create your profile and describe your needs. Our community is ready to support you.",
      "features.offer.title": "Offer Support",
      "features.offer.description": "Whether you're an individual, NGO, or company. Your help can transform lives.",
      "features.connect.title": "Connect",
      "features.connect.description": "Secure messaging and rating system for trustworthy connections.",
      
      // Stats
      "stats.users": "Active Users",
      "stats.offers": "Help Offers",
      "stats.connections": "Connections Made",
      "stats.cities": "Cities Served",
      
      // About
      "about.title": "About IntegrAção",
      "about.description": "Based on UN SDGs 3, 4, 8, and 10, IntegrAção is a digital platform that connects vulnerable people with supporters.",
      "about.mission": "Our mission is to create a solidarity network that promotes health, education, decent work, and inequality reduction.",
      
      // Forms
      "form.name": "Name",
      "form.email": "Email",
      "form.password": "Password",
      "form.confirmPassword": "Confirm Password",
      "form.phone": "Phone",
      "form.city": "City",
      "form.state": "State",
      "form.bio": "Biography",
      "form.submit": "Submit",
      "form.cancel": "Cancel",
      
      // User Types
      "userType.vulnerable": "Vulnerable Person",
      "userType.supporter": "Supporter",
      "userType.admin": "Administrator",
      
      // Help Types
      "helpType.housing": "Housing",
      "helpType.job": "Employment",
      "helpType.health": "Health",
      "helpType.education": "Education",
      "helpType.legal": "Legal",
      "helpType.psychological": "Psychological",
      "helpType.dental": "Dental",
      "helpType.donation": "Donation",
      "helpType.emotional": "Emotional Support",
      "helpType.course": "Course",
      "helpType.other": "Other",
      
      // Messages
      "message.success": "Operation completed successfully!",
      "message.error": "An error occurred. Please try again.",
      "message.loading": "Loading...",
      "message.noData": "No data found.",
      
      // Chat
      "chat.title": "Chat",
      "chat.placeholder": "Type your message...",
      "chat.send": "Send",
      "chat.online": "Online",
      "chat.offline": "Offline",
      
      // Dashboard
      "dashboard.welcome": "Welcome",
      "dashboard.myOffers": "My Offers",
      "dashboard.myRequests": "My Requests",
      "dashboard.messages": "Messages",
      "dashboard.evaluations": "Evaluations",
      
      // Footer
      "footer.description": "IntegrAção - Connecting lives and transforming futures through solidarity.",
      "footer.links": "Useful Links",
      "footer.contact": "Contact",
      "footer.social": "Social Media",
      "footer.rights": "All rights reserved."
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.home": "Inicio",
      "nav.about": "Acerca",
      "nav.offers": "Ofertas",
      "nav.requests": "Solicitudes",
      "nav.contact": "Contacto",
      "nav.login": "Iniciar Sesión",
      "nav.register": "Registrarse",
      "nav.dashboard": "Panel",
      "nav.profile": "Perfil",
      "nav.logout": "Salir",
      
      // Hero Section
      "hero.title": "Conectando Vidas, Transformando Futuros",
      "hero.subtitle": "Una plataforma que conecta personas vulnerables con partidarios dispuestos a ayudar. Juntos, construimos una sociedad más justa y solidaria.",
      "hero.cta.primary": "Comenzar",
      "hero.cta.secondary": "Saber Más",
      
      // Features
      "features.title": "Cómo Funciona",
      "features.subtitle": "Nuestra plataforma conecta a quienes necesitan con quienes pueden ayudar",
      "features.help.title": "Pedir Ayuda",
      "features.help.description": "Crea tu perfil y describe tus necesidades. Nuestra comunidad está lista para apoyarte.",
      "features.offer.title": "Ofrecer Apoyo",
      "features.offer.description": "Ya seas una persona, ONG o empresa. Tu ayuda puede transformar vidas.",
      "features.connect.title": "Conectar",
      "features.connect.description": "Sistema seguro de mensajes y calificaciones para conexiones confiables.",
      
      // Stats
      "stats.users": "Usuarios Activos",
      "stats.offers": "Ofertas de Ayuda",
      "stats.connections": "Conexiones Realizadas",
      "stats.cities": "Ciudades Atendidas",
      
      // About
      "about.title": "Acerca de IntegrAção",
      "about.description": "Basado en los ODS 3, 4, 8 y 10 de la ONU, IntegrAção es una plataforma digital que conecta personas vulnerables con partidarios.",
      "about.mission": "Nuestra misión es crear una red de solidaridad que promueva salud, educación, trabajo digno y reducción de desigualdades.",
      
      // Forms
      "form.name": "Nombre",
      "form.email": "Correo",
      "form.password": "Contraseña",
      "form.confirmPassword": "Confirmar Contraseña",
      "form.phone": "Teléfono",
      "form.city": "Ciudad",
      "form.state": "Estado",
      "form.bio": "Biografía",
      "form.submit": "Enviar",
      "form.cancel": "Cancelar",
      
      // User Types
      "userType.vulnerable": "Persona Vulnerable",
      "userType.supporter": "Partidario",
      "userType.admin": "Administrador",
      
      // Help Types
      "helpType.housing": "Vivienda",
      "helpType.job": "Empleo",
      "helpType.health": "Salud",
      "helpType.education": "Educación",
      "helpType.legal": "Legal",
      "helpType.psychological": "Psicológico",
      "helpType.dental": "Dental",
      "helpType.donation": "Donación",
      "helpType.emotional": "Apoyo Emocional",
      "helpType.course": "Curso",
      "helpType.other": "Otros",
      
      // Messages
      "message.success": "¡Operación completada con éxito!",
      "message.error": "Ocurrió un error. Inténtalo de nuevo.",
      "message.loading": "Cargando...",
      "message.noData": "No se encontraron datos.",
      
      // Chat
      "chat.title": "Chat",
      "chat.placeholder": "Escribe tu mensaje...",
      "chat.send": "Enviar",
      "chat.online": "En línea",
      "chat.offline": "Desconectado",
      
      // Dashboard
      "dashboard.welcome": "Bienvenido(a)",
      "dashboard.myOffers": "Mis Ofertas",
      "dashboard.myRequests": "Mis Solicitudes",
      "dashboard.messages": "Mensajes",
      "dashboard.evaluations": "Evaluaciones",
      
      // Footer
      "footer.description": "IntegrAção - Conectando vidas y transformando futuros a través de la solidaridad.",
      "footer.links": "Enlaces Útiles",
      "footer.contact": "Contacto",
      "footer.social": "Redes Sociales",
      "footer.rights": "Todos los derechos reservados."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;