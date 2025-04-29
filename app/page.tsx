import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload, Brain, Cloud, Mic, Heart, ArrowRight } from "lucide-react";
import WaveAnimation from "@/components/wave-animation";
import TestimonialCard from "@/components/testimonial-card";
import StepCard from "@/components/step-card";
import FAQItem from "@/components/faq-item";
import ParticlesBackground from "@/components/particles-background";
import ScrollIndicator from "@/components/scroll-indicator";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-65px)] flex-col bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 text-center h-screen">
        {/* Particles background */}
        <ParticlesBackground />

        {/* Background wave effect - mais suave */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <WaveAnimation height={250} speed={0.03} amplitude={10} />
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl mx-auto space-y-8 z-10 px-6 -mt-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
            Preservando memórias desde 2025
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Guarde o som daqueles que você ama
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto font-light">
            Tecnologia de IA para reconstruir vozes com emoção original
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/vozes">
              <Button className="text-lg px-8 py-6 rounded-lg bg-primary hover:bg-primary/90 text-black border-none transition-all duration-300">
                Preservar uma voz
              </Button>
            </Link>
            <Link href="/memorias">
              <Button className="text-lg px-8 py-6 rounded-lg bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 transition-all duration-300">
                Ver gravações
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Por que preservar vozes?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A voz é uma das memórias mais poderosas que temos de alguém. Ela
              carrega emoção, personalidade e histórias que merecem ser
              preservadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light">
                Envie qualquer formato de áudio
              </h3>
              <p className="text-white/60">
                Suporte para MP3, WAV, MP4 e outros formatos populares de áudio
                e vídeo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light">
                Reconstrução fiel da voz original
              </h3>
              <p className="text-white/60">
                Nossa IA preserva as nuances, emoções e características únicas
                de cada voz.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <Cloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light">
                Armazenamento seguro por décadas
              </h3>
              <p className="text-white/60">
                Suas memórias sonoras preservadas com segurança e acessíveis
                quando você precisar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-black relative">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 right-0 rotate-180">
            <WaveAnimation
              height={200}
              color="#A78BFA"
              speed={0.03}
              amplitude={8}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Como funciona
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Em apenas três passos simples, você pode preservar vozes
              importantes para sempre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              title="Envie sua gravação"
              description="Faça upload de qualquer arquivo de áudio ou vídeo que contenha a voz que deseja preservar."
              icon={Mic}
            />
            <StepCard
              title="Processamento com IA"
              description="Nossa tecnologia analisa e reconstrói a voz, preservando suas características únicas."
              icon={Brain}
            />
            <StepCard
              title="Guarde para sempre"
              description="Acesse, compartilhe e reviva essas memórias sonoras quando quiser, de onde estiver."
              icon={Heart}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              O que dizem nossos usuários
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Histórias reais de pessoas que preservaram vozes importantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Poder ouvir a voz do meu pai novamente, mesmo depois de sua partida, é um presente que não tem preço."
              name="Maria Silva"
              relation="Preservou a voz do pai"
              initials="MS"
            />
            <TestimonialCard
              quote="Guardei as histórias que minha avó contava. Agora meus filhos podem ouvir a voz dela contando as mesmas histórias."
              name="João Oliveira"
              relation="Preservou a voz da avó"
              initials="JO"
            />
            <TestimonialCard
              quote="A qualidade da reconstrução é impressionante. Cada detalhe da voz do meu irmão foi preservado."
              name="Ana Costa"
              relation="Preservou a voz do irmão"
              initials="AC"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o Ecos e como preservamos vozes.
            </p>
          </div>

          <div className="space-y-2">
            <FAQItem
              question="Que tipos de arquivos posso enviar?"
              answer="Aceitamos praticamente todos os formatos de áudio e vídeo, incluindo MP3, WAV, MP4, MOV, M4A e muitos outros. Se você tiver uma gravação antiga em formato não digital, podemos ajudar com o processo de digitalização."
            />
            <FAQItem
              question="Como a tecnologia de IA funciona?"
              answer="Nossa tecnologia analisa profundamente as características únicas da voz, incluindo tom, ritmo, entonação e peculiaridades. Usamos modelos avançados de IA para reconstruir e preservar essas características, garantindo que a essência da voz original seja mantida."
            />
            <FAQItem
              question="As gravações são seguras?"
              answer="Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos os mais rigorosos protocolos de segurança. Seus arquivos são armazenados em servidores seguros e você tem controle total sobre quem pode acessá-los."
            />
            <FAQItem
              question="Por quanto tempo as vozes ficam armazenadas?"
              answer="Nosso compromisso é preservar essas memórias para sempre. Seu plano inclui armazenamento perpétuo, com backups regulares e migração para novas tecnologias conforme necessário."
            />
            <FAQItem
              question="Posso compartilhar as gravações com outras pessoas?"
              answer="Sim, você pode compartilhar suas gravações com familiares e amigos através de links seguros. Você controla quem tem acesso e por quanto tempo."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <WaveAnimation height={250} amplitude={10} speed={0.03} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Comece a preservar vozes importantes hoje
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Porque algumas histórias merecem ser ouvidas para sempre.
          </p>
          <Link href="/vozes">
            <Button className="text-lg px-10 py-7 rounded-lg bg-primary hover:bg-primary/90 text-black border-none transition-all duration-300 group">
              Preservar uma voz
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/40">
              Ecos © 2025 - Nunca esqueceremos
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 mt-4 md:mt-0 text-center md:text-left">
              <p className="text-sm text-white/40">
                Desenvolvido com <span className="text-primary">♥</span> por
              </p>
              <p className="text-sm text-white/60">
                Larissa Sayuri, Fabio Lucena e Thiago Soares
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
