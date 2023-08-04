<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $name = isset($_GET['name']) ? $_GET['name'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';
    $celular = isset($_GET['celular']) ? $_GET['celular'] : '';
    $estado = isset($_GET['estado']) ? $_GET['estado'] : '';
    $cidade = isset($_GET['cidade']) ? $_GET['cidade'] : '';

    // Validação básica
    if(empty($name) || empty($email) || empty($celular) || empty($estado) || empty($cidade)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Por favor, insira um email válido.";
        exit;
    }

    // Aqui você deve inserir o email para onde deseja enviar o formulário
    $to = "sanzabuza5@gmail.com"; 

    // Assunto do email
    $subject = "Quero ser um Distribuidor: $name";

    // Corpo do email
    $body = "Você recebeu uma nova mensagem do seu formulário de contato\n\n"."Aqui estão os detalhes:\n\nNome: $name\n\nEmail: $email\n\nCelular:\n$celular\n\nEstado: $estado\n\nCidade: $cidade\n";

    // Crie uma nova instância do PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor
        $mail->SMTPDebug = 2;                                 
        $mail->isSMTP();                                      
        $mail->Host = 'smtp1.example.com;smtp2.example.com';  
        $mail->SMTPAuth = true;                               
        $mail->Username = 'user@example.com';                 
        $mail->Password = 'secret';                           
        $mail->SMTPSecure = 'tls';                            
        $mail->Port = 587;                                    

        // Destinatários
        $mail->setFrom('noreply@glynett.com.br', 'Mailer');
        $mail->addAddress($to, $name);     

        // Conteúdo
        $mail->isHTML(true);                                  
        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();
        echo 'Email enviado com sucesso';
    } catch (Exception $e) {
        echo 'O email não pôde ser enviado. Mailer Error: ', $mail->ErrorInfo;
    }

    // Redireciona de volta para a página do formulário
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
