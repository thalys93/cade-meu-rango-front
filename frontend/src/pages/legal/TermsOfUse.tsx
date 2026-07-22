import { Link } from "react-router-dom"
import { LegalArticle } from "@/pages/legal/LegalArticle"

export default function TermsOfUsePage() {
  return (
    <LegalArticle title="Termos de Uso" updatedAt="22 de julho de 2026">
      <section className="space-y-3">
        <h2>1. Aceitação</h2>
        <p>
          Ao acessar ou utilizar o Cadê Meu Rango, você concorda com estes Termos de Uso e com a
          nossa{" "}
          <Link to="/privacidade" className="font-medium text-primary hover:underline">
            Política de Privacidade
          </Link>
          . Se não concordar, não utilize a plataforma.
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. O serviço</h2>
        <p>
          O Cadê Meu Rango é uma plataforma para publicar, consultar e compartilhar receitas e
          dicas culinárias. Podemos evoluir funcionalidades, corrigir falhas e suspender o serviço
          temporariamente para manutenção, sempre que necessário à continuidade e à segurança da
          operação.
        </p>
      </section>

      <section className="space-y-3">
        <h2>3. Conta e responsabilidades do usuário</h2>
        <ul>
          <li>Informar dados verdadeiros e manter a senha em sigilo.</li>
          <li>Não publicar conteúdo ilícito, ofensivo, discriminatório ou que viole direitos de terceiros.</li>
          <li>Não tentar acessar áreas restritas, explorar vulnerabilidades ou prejudicar a disponibilidade do serviço.</li>
          <li>Responder pelo conteúdo que publicar (receitas, dicas, imagens e textos).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>4. Conteúdo e propriedade intelectual</h2>
        <p>
          Você mantém os direitos sobre o conteúdo que envia e concede ao Cadê Meu Rango licença
          não exclusiva para exibi-lo na plataforma. Marcas, layout, código e demais elementos do
          site permanecem protegidos por lei. É vedada a cópia ou redistribuição sem autorização,
          salvo o permitido pela legislação aplicável.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Segurança da informação</h2>
        <p>
          Adotamos práticas alinhadas à LGPD e a princípios de segurança da informação reconhecidos
          por normas ABNT NBR ISO/IEC 27001 (confidencialidade, integridade e disponibilidade),
          incluindo autenticação, controle de acesso e proteção de dados pessoais. Nenhum sistema
          é 100% livre de riscos; reporte incidentes pelo canal indicado na Política de Privacidade.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Limitação de responsabilidade</h2>
        <p>
          Receitas e dicas são contribuições de usuários e têm caráter informativo. Não nos
          responsabilizamos por resultados culinários, alergias, intolerâncias ou danos decorrentes
          do uso indevido do conteúdo. O serviço é oferecido “como está”, dentro dos limites da lei.
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Suspensão e encerramento</h2>
        <p>
          Podemos suspender ou encerrar contas que violem estes termos, a legislação ou a segurança
          da plataforma. Você pode solicitar exclusão de conta conforme a Política de Privacidade.
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Alterações</h2>
        <p>
          Estes termos podem ser atualizados. A data de revisão consta no topo desta página. O uso
          contínuo após a publicação das mudanças indica concordância com a nova versão.
        </p>
      </section>

      <section className="space-y-3">
        <h2>9. Foro</h2>
        <p>
          Aplica-se a legislação brasileira. Fica eleito o foro do domicílio do usuário, quando
          consumidor, ou o foro competente conforme a legislação vigente, para dirimir controvérsias.
        </p>
      </section>
    </LegalArticle>
  )
}
