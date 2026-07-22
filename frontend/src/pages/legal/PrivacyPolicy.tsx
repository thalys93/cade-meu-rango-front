import { Link } from "react-router-dom"
import { LegalArticle } from "@/pages/legal/LegalArticle"

export default function PrivacyPolicyPage() {
  return (
    <LegalArticle title="Política de Privacidade" updatedAt="22 de julho de 2026">
      <section className="space-y-3">
        <h2>1. Quem somos</h2>
        <p>
          Esta Política descreve como o Cadê Meu Rango trata dados pessoais, em conformidade com a
          Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e com boas práticas de
          segurança da informação alinhadas à ABNT NBR ISO/IEC 27001.
        </p>
      </section>

      <section className="space-y-3">
        <h2>2. Dados que coletamos</h2>
        <ul>
          <li>
            <strong>Cadastro:</strong> nome, e-mail e senha (armazenada de forma criptografada).
          </li>
          <li>
            <strong>Perfil e conteúdo:</strong> foto, receitas, dicas e imagens enviadas por você.
          </li>
          <li>
            <strong>Uso técnico:</strong> logs de acesso, endereço IP, tipo de dispositivo e dados
            de sessão necessários à autenticação e à segurança.
          </li>
          <li>
            <strong>Cookies:</strong> preferências (tema, consentimento) e métricas agregadas para
            melhorar a experiência — veja a seção 6.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>3. Finalidades e bases legais</h2>
        <p>Tratamos dados para:</p>
        <ul>
          <li>Criar e autenticar sua conta (execução de contrato / legítimo interesse).</li>
          <li>Publicar e exibir o conteúdo que você envia (execução de contrato).</li>
          <li>Proteger a plataforma contra abuso e incidentes (legítimo interesse / obrigação legal).</li>
          <li>Cumprir obrigações legais e atender direitos do titular (LGPD).</li>
          <li>Melhorar usabilidade com cookies não essenciais apenas após consentimento.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2>4. Compartilhamento</h2>
        <p>
          Não vendemos dados pessoais. Podemos compartilhar informações com provedores de
          infraestrutura (hospedagem, e-mail, armazenamento de mídia) estritamente para operar o
          serviço, sob contratos e medidas de segurança adequadas, ou quando exigido por lei.
        </p>
      </section>

      <section className="space-y-3">
        <h2>5. Retenção e segurança</h2>
        <p>
          Mantemos dados pelo tempo necessário às finalidades ou às obrigações legais. Aplicamos
          controles de acesso, criptografia em trânsito (HTTPS), hashing de senhas e monitoramento
          básico de incidentes, seguindo os princípios de confidencialidade, integridade e
          disponibilidade.
        </p>
      </section>

      <section className="space-y-3">
        <h2>6. Cookies</h2>
        <p>
          Usamos cookies essenciais (sessão, autenticação, preferências de tema e registro do seu
          consentimento) e, com sua anuência, cookies que ajudam a entender o uso do site e
          aprimorar a navegação. Você pode aceitar pelo aviso exibido no site. Para mais detalhes
          sobre o uso da plataforma, consulte também os{" "}
          <Link to="/termos" className="font-medium text-primary hover:underline">
            Termos de Uso
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2>7. Seus direitos (LGPD)</h2>
        <p>Você pode solicitar:</p>
        <ol>
          <li>Confirmação da existência de tratamento</li>
          <li>Acesso, correção ou anonimização dos dados</li>
          <li>Portabilidade, quando aplicável</li>
          <li>Eliminação de dados desnecessários ou tratados com consentimento</li>
          <li>Informação sobre compartilhamentos e revogação do consentimento</li>
        </ol>
        <p>
          Para exercer direitos, envie solicitação para{" "}
          <a
            href="mailto:privacidade@cademeurango.com.br"
            className="font-medium text-primary hover:underline"
          >
            privacidade@cademeurango.com.br
          </a>
          . Responderemos no prazo legal.
        </p>
      </section>

      <section className="space-y-3">
        <h2>8. Menores de idade</h2>
        <p>
          O serviço não é direcionado a menores de 13 anos. Contas de adolescentes devem observar
          a legislação aplicável e, quando exigido, o consentimento do responsável.
        </p>
      </section>

      <section className="space-y-3">
        <h2>9. Alterações</h2>
        <p>
          Esta política pode ser atualizada. A data no topo indica a versão vigente. Mudanças
          relevantes poderão ser comunicadas no site ou por e-mail cadastrado.
        </p>
      </section>
    </LegalArticle>
  )
}
