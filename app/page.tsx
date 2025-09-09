"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LanguageSelector } from "@/components/language-selector"
import { ChatSupport } from "@/components/chat-support"
import {
  Building2,
  Shield,
  CreditCard,
  TrendingUp,
  Globe,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Lock,
  Smartphone,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react"
import { translations, detectLanguage, type Language } from "@/lib/i18n"

export default function Page() {
  const [currentView, setCurrentView] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })
  const [adminError, setAdminError] = useState("")
  const [language, setLanguage] = useState<Language>("de")
  const router = useRouter()

  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  const t = translations[language]

  useEffect(() => {
    if (logoClickCount > 0 && logoClickCount < 3) {
      const timer = setTimeout(() => setLogoClickCount(0), 3000)
      return () => clearTimeout(timer)
    }
  }, [logoClickCount])

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount === 3) {
      setShowAdminLogin(true)
      setLogoClickCount(0)
    }
  }

  const handleAdminLogin = () => {
    if (adminCredentials.username === "admin" && adminCredentials.password === "admin111") {
      document.cookie = "admin_session=true; path=/; max-age=3600"
      router.push("/admin")
    } else {
      setAdminError(language === "de" ? "Ungültige Anmeldedaten" : "Invalid credentials")
    }
  }

  const handleSignIn = () => {
    router.push("/auth/login")
  }

  const handleOpenAccount = () => {
    router.push("/auth/sign-up")
  }

  const navigation = [
    { name: t.home, id: "home" },
    { name: t.services, id: "services" },
    { name: t.about, id: "about" },
    { name: "Features", id: "features" },
    { name: t.contact, id: "contact" },
    { name: "Legal", id: "legal" },
  ]

  const services = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: language === "de" ? "Privatkunden" : "Personal Banking",
      description:
        language === "de"
          ? "Umfassende Bankdienstleistungen für Ihre persönlichen Finanzbedürfnisse."
          : "Comprehensive personal banking solutions tailored to your financial needs.",
      features:
        language === "de"
          ? ["Giro- & Sparkonten", "Privatkredite", "Kreditkarten", "Hypotheken"]
          : ["Checking & Savings", "Personal Loans", "Credit Cards", "Mortgages"],
      image: "/images/account-opening.jpg",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: language === "de" ? "Firmenkunden" : "Business Banking",
      description:
        language === "de"
          ? "Leistungsstarke Banking-Lösungen für Ihr Unternehmenswachstum."
          : "Powerful banking solutions to help your business grow and succeed.",
      features:
        language === "de"
          ? ["Geschäftskonten", "Firmenkredite", "Cash Management", "Zahlungsverkehr"]
          : ["Business Accounts", "Commercial Loans", "Cash Management", "Merchant Services"],
      image: "/images/banking-hero-2.jpg",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: language === "de" ? "Vermögensverwaltung" : "Investment Services",
      description:
        language === "de"
          ? "Professionelle Anlageberatung für Ihren Vermögensaufbau."
          : "Expert investment guidance to help you build and preserve wealth.",
      features:
        language === "de"
          ? ["Portfolio Management", "Altersvorsorge", "Vermögensberatung", "Marktanalysen"]
          : ["Portfolio Management", "Retirement Planning", "Wealth Advisory", "Market Research"],
      image: "/images/executive-portrait.jpg",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: language === "de" ? "Digitale Sicherheit" : "Digital Security",
      description:
        language === "de"
          ? "Modernste Sicherheitsmaßnahmen zum Schutz Ihrer Finanzdaten."
          : "Advanced security measures to protect your financial information.",
      features:
        language === "de"
          ? ["Biometrische Authentifizierung", "Betrugsschutz", "Sichere Transaktionen", "24/7 Überwachung"]
          : ["Biometric Authentication", "Fraud Protection", "Secure Transactions", "24/7 Monitoring"],
      image: "/images/digital-banking.jpg",
    },
  ]

  const features = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: language === "de" ? "Mobile Banking" : "Mobile Banking",
      description:
        language === "de"
          ? "Banken Sie überall und jederzeit mit unserer preisgekrönten App."
          : "Bank anywhere, anytime with our award-winning mobile app.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: language === "de" ? "Erweiterte Sicherheit" : "Advanced Security",
      description:
        language === "de"
          ? "Mehrstufige Sicherheit mit biometrischer Authentifizierung und Betrugsschutz."
          : "Multi-layer security with biometric authentication and fraud protection.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: language === "de" ? "24/7 Support" : "24/7 Support",
      description:
        language === "de"
          ? "Rund um die Uhr Kundensupport, wann immer Sie Hilfe benötigen."
          : "Round-the-clock customer support whenever you need assistance.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === "de" ? "Globaler Zugang" : "Global Access",
      description:
        language === "de"
          ? "Weltweiter Zugang zu Ihren Konten über unser internationales Banknetzwerk."
          : "Access your accounts worldwide with our international banking network.",
    },
  ]

  const stats = [
    { label: language === "de" ? "Globale Kunden" : "Global Customers", value: "2.5M+" },
    { label: language === "de" ? "Länder weltweit" : "Countries Served", value: "45+" },
    { label: language === "de" ? "Jahre Exzellenz" : "Years of Excellence", value: "150+" },
    { label: language === "de" ? "Verwaltetes Vermögen" : "Assets Under Management", value: "€500Mrd+" },
  ]

  const renderHome = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/images/banking-hero-1.jpg')",
            backgroundColor: "#1e293b", // fallback color
          }}
        />
        <div className="absolute inset-0 bg-slate-900/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance leading-tight"
            style={{ color: "#ffffff" }}
          >
            {language === "de" ? "Banking-Exzellenz" : "Banking Excellence"}
            <span className="block mt-2" style={{ color: "#93c5fd" }}>
              {language === "de" ? "Neu Definiert" : "Redefined"}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance leading-relaxed" style={{ color: "#f1f5f9" }}>
            {language === "de"
              ? "Erleben Sie die Zukunft des Bankwesens mit der Deutsche Global Bank. Sicher, innovativ und weltweit vertrauenswürdig."
              : "Experience the future of banking with Deutsche Global Bank. Secure, innovative, and globally trusted financial services."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 border-0 px-8 py-4 text-lg font-semibold shadow-xl"
              style={{ color: "#ffffff" }}
              onClick={handleOpenAccount}
            >
              {t.openAccount}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold bg-transparent shadow-xl transition-all duration-200"
              style={{ color: "#ffffff", borderColor: "#ffffff" }}
            >
              {t.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance text-slate-900">
              {language === "de" ? "Umfassende Banking-Lösungen" : "Comprehensive Banking Solutions"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-balance">
              {language === "de"
                ? "Von Privatkunden bis zu Unternehmenslösungen bieten wir die Finanzdienstleistungen, die Sie für Ihre Ziele benötigen."
                : "From personal banking to business solutions, we provide the financial services you need to achieve your goals."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white shadow-lg overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="p-3 bg-blue-600/90 rounded-full text-white backdrop-blur-sm">{service.icon}</div>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-serif text-slate-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-600 mb-4">{service.description}</CardDescription>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance text-slate-900">
              {language === "de" ? "Warum Deutsche Global Bank wählen" : "Why Choose Deutsche Global Bank"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-balance">
              {language === "de"
                ? "Erleben Sie Banking, das sich Ihrem Lebensstil anpasst, mit modernster Technologie und persönlichem Service."
                : "Experience banking that adapts to your lifestyle with cutting-edge technology and personalized service."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6 text-slate-900">
                {language === "de" ? "Kostenloses Bankkonto in Deutschland" : "Free Bank Account in Germany"}
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {language === "de"
                  ? "Eröffnen Sie heute Ihr kostenloses Bankkonto und genießen Sie 7 verschiedene Kontotypen für ein reibungsloses Banking-Erlebnis. Keine versteckten Gebühren, keine Mindesteinlage."
                  : "Open your free bank account today and enjoy 7 different account types for a smooth banking experience. No hidden fees, no minimum balance requirements."}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">
                    {language === "de" ? "Keine monatlichen Gebühren" : "No monthly fees"}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">
                    {language === "de" ? "Kostenlose Debitkarte" : "Free debit card"}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">
                    {language === "de" ? "Online- und Mobile Banking" : "Online and mobile banking"}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-slate-700">
                    {language === "de" ? "24/7 Kundensupport" : "24/7 customer support"}
                  </span>
                </li>
              </ul>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
                onClick={handleOpenAccount}
              >
                {language === "de" ? "Kostenloses Konto eröffnen" : "Open Free Account"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/images/free-account-promo.jpg"
                alt="Free Bank Account Promotion"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance" style={{ color: "#ffffff" }}>
            {language === "de" ? "Bereit für Exzellenz?" : "Ready to Experience Excellence?"}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-balance" style={{ color: "#ffffff" }}>
            {language === "de"
              ? "Schließen Sie sich Millionen von Kunden an, die der Deutsche Global Bank für ihre Finanzbedürfnisse vertrauen."
              : "Join millions of customers who trust Deutsche Global Bank for their financial needs."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold bg-white hover:bg-slate-100"
              style={{ color: "#2563eb" }}
              onClick={handleOpenAccount}
            >
              {language === "de" ? "Heute Konto eröffnen" : "Open Account Today"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-200"
              style={{ color: "#ffffff", borderColor: "#ffffff" }}
            >
              {language === "de" ? "Beratung vereinbaren" : "Schedule Consultation"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )

  const renderServices = () => (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Comprehensive financial solutions designed to meet your every need.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="glass banking-card-hover border-0 text-card-foreground overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 rounded-full">{service.icon}</div>
                  <CardTitle className="text-2xl font-serif">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-card-foreground/80 text-lg">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">About Deutsche Global Bank</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Over 150 years of banking excellence, innovation, and trusted financial partnership.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Our Heritage</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded in 1873, Deutsche Global Bank has been at the forefront of banking innovation for over a century
              and a half. From our humble beginnings in Frankfurt to becoming a global financial powerhouse, we've
              consistently delivered exceptional service and innovative solutions to our clients worldwide.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we serve over 2.5 million customers across 45 countries, managing over $500 billion in assets while
              maintaining our commitment to personal service and financial excellence.
            </p>
          </div>
          <div className="relative">
            <img
              src="/images/executive-portrait.jpg"
              alt="Deutsche Global Bank Leadership"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Recognized globally for our commitment to banking excellence and customer satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Industry-leading security measures to protect your financial information and assets.
              </p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Worldwide presence with local expertise to serve you wherever you are.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderFeatures = () => (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">Our Features</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Discover the features that make Deutsche Global Bank the best choice for your financial needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Innovative Technology</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Stay ahead with our cutting-edge technology and seamless digital banking experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mobile app and online banking platform offer real-time updates, secure transactions, and personalized
              service to meet your banking needs on the go.
            </p>
          </div>
          <div className="relative">
            <img src="/images/innovative-tech.jpg" alt="Innovative Technology" className="rounded-lg shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Smartphone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Mobile Banking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">Bank anywhere, anytime with our award-winning mobile app.</p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Advanced Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Multi-layer security with biometric authentication and fraud protection.
              </p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">Round-the-clock customer support whenever you need assistance.</p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Global Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Access your accounts worldwide with our international banking network.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Get in touch with Deutsche Global Bank for any inquiries or assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li>
                <Phone className="inline-block mr-2 h-6 w-6" />
                +1 (555) 123-4567
              </li>
              <li>
                <Mail className="inline-block mr-2 h-6 w-6" />
                contact@deutscheglobal.com
              </li>
              <li>
                <MapPin className="inline-block mr-2 h-6 w-6" />
                123 Banking Street
                <br />
                Frankfurt, Germany
              </li>
            </ul>
          </div>
          <div className="relative">
            <img src="/images/contact-us.jpg" alt="Contact Us" className="rounded-lg shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Reach out to our customer support team for immediate assistance.
              </p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">Send us an email with your questions or concerns.</p>
            </CardContent>
          </Card>

          <Card className="glass banking-card-hover border-0 text-card-foreground text-center">
            <CardHeader>
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="font-serif">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80">
                Come to our office for a face-to-face meeting with our banking experts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderLegal = () => (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">Legal Information</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Important legal documents and information provided by Deutsche Global Bank.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Privacy Policy</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Learn about how we protect your personal information and privacy.
            </p>
            <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
              Read Privacy Policy
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <img src="/images/privacy-policy.jpg" alt="Privacy Policy" className="rounded-lg shadow-2xl" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Terms of Service</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Review our terms of service to understand the conditions of using our banking services.
            </p>
            <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
              Read Terms of Service
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <img src="/images/terms-of-service.jpg" alt="Terms of Service" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return renderHome()
      case "services":
        return renderServices()
      case "about":
        return renderAbout()
      case "features":
        return renderFeatures()
      case "contact":
        return renderContact()
      case "legal":
        return renderLegal()
      default:
        return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={handleLogoClick}>
              <img
                src="/images/deutsche-bank-logo.png"
                alt="Deutsche Bank"
                className="h-10 w-auto"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(13%) sepia(94%) saturate(7151%) hue-rotate(230deg) brightness(92%) contrast(112%)",
                  background: "transparent",
                }}
              />
              <span className="text-xl font-serif font-bold text-slate-900">Deutsche Global Bank</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    currentView === item.id ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector onLanguageChange={setLanguage} />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignIn}
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                {t.login}
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleOpenAccount}>
                {t.signup}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`text-left text-sm font-medium transition-colors hover:text-blue-600 ${
                      currentView === item.id ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                  <LanguageSelector onLanguageChange={setLanguage} className="mb-2" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignIn}
                    className="border-slate-300 text-slate-700 bg-transparent"
                  >
                    {t.login}
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleOpenAccount}>
                    {t.signup}
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">{renderCurrentView()}</main>

      <ChatSupport language={language} />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/deutsche-bank-logo.png"
                  alt="Deutsche Bank"
                  className="h-6 w-auto"
                  style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
                />
                <span className="font-serif font-bold">Deutsche Global Bank</span>
              </div>
              <p className="text-slate-400 text-sm">
                {language === "de"
                  ? "Ihr vertrauensvoller Partner für Banking-Exzellenz seit über 150 Jahren."
                  : "Your trusted partner in banking excellence for over 150 years."}
              </p>
            </div>

            <div>
              <h4 className="font-serif font-semibold mb-4 text-white">{t.services}</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => setCurrentView("services")} className="hover:text-white transition-colors">
                    {language === "de" ? "Privatkunden" : "Personal Banking"}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("services")} className="hover:text-white transition-colors">
                    {language === "de" ? "Firmenkunden" : "Business Banking"}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("services")} className="hover:text-white transition-colors">
                    {language === "de" ? "Vermögensverwaltung" : "Investment Services"}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("services")} className="hover:text-white transition-colors">
                    {language === "de" ? "Digitale Sicherheit" : "Digital Security"}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold mb-4 text-white">
                {language === "de" ? "Unternehmen" : "Company"}
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => setCurrentView("about")} className="hover:text-white transition-colors">
                    {t.about}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("features")} className="hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("contact")} className="hover:text-white transition-colors">
                    {t.contact}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView("legal")} className="hover:text-white transition-colors">
                    Legal
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold mb-4 text-white">{t.contact}</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="text-slate-400">+49 (0) 69 910-00</li>
                <li className="text-slate-400">kontakt@deutscheglobal.de</li>
                <li className="text-slate-400">
                  Taunusanlage 12
                  <br />
                  60325 Frankfurt am Main
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>
              &copy; 2024 Deutsche Global Bank AG.{" "}
              {language === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="sm:max-w-md bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-center font-serif text-slate-900">
              {language === "de" ? "Admin-Zugang" : "Admin Access"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-username" className="text-slate-700">
                {language === "de" ? "Benutzername" : "Username"}
              </Label>
              <Input
                id="admin-username"
                value={adminCredentials.username}
                onChange={(e) => setAdminCredentials((prev) => ({ ...prev, username: e.target.value }))}
                placeholder={language === "de" ? "Benutzername eingeben" : "Enter username"}
                className="bg-white text-slate-900 border-slate-300"
              />
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-slate-700">
                {language === "de" ? "Passwort" : "Password"}
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))}
                placeholder={language === "de" ? "Passwort eingeben" : "Enter password"}
                onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                className="bg-white text-slate-900 border-slate-300"
              />
            </div>
            {adminError && <p className="text-sm text-red-600">{adminError}</p>}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent text-slate-700 border-slate-300 hover:bg-slate-50"
                onClick={() => {
                  setShowAdminLogin(false)
                  setAdminCredentials({ username: "", password: "" })
                  setAdminError("")
                }}
              >
                {language === "de" ? "Abbrechen" : "Cancel"}
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAdminLogin}>
                {language === "de" ? "Anmelden" : "Sign In"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
