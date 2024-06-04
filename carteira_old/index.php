<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificação de pesquisa por número da carteira
    if (isset($_POST['submit-search'])) {
        if (isset($_POST['searchNumber'])) {
            $searchNumber = $_POST['searchNumber'];
            $regex = '/^[0-9]+$/';

            if (strlen($searchNumber) != 16 || !preg_match($regex, $searchNumber)) {
                echo '<script>alert("Por favor, digite um número válido!");</script>';
            } else {

                $stmt = $con->prepare("SELECT * FROM carteira WHERE numero_carteira = ?");
                $stmt->bind_param("s", $searchNumber);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result) {
                    if ($result->num_rows > 0) {

                        $row = $result->fetch_assoc();
                        $nameBenef = urlencode($row["nome_beneficiario"]);
                        $numberBenef = urlencode($row["numero_carteira"]);
                        header("Location: index.php?nameBenef=$nameBenef&numberBenef=$numberBenef");
                        exit();

                    } else {
                        echo '<script>alert("Usuário inexistente.");</script>';
                    }
                } else {
                    echo "Erro na consulta: " . mysqli_error($con);
                }
            }
        }
    }

    // Cadastro de novo beneficiário
    if (isset($_POST['submit'])) {
        $nameBenef = mysqli_real_escape_string($con, $_POST['nameBenef']);
        $numberBenef = mysqli_real_escape_string($con, $_POST['numberBenef']);
        $numberBenner = mysqli_real_escape_string($con, $_POST['numberBenner']);

        if (strlen($numberBenef) != 16 || strlen($numberBenner) != 15) {
            echo '<script>alert("O número da carteira deve ter 16 dígitos e o número Benner 15 dígitos.");</script>';
            exit;
        } else {
            if (empty($nameBenef) || empty($numberBenef) || empty($numberBenner)) {
                echo "Todos os campos devem ser preenchidos";
                exit;
            } else {

                $stmt = $con->prepare("SELECT * FROM carteira WHERE numero_carteira = ?");
                $stmt->bind_param("s", $numberBenef);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result) {
                    if ($result->num_rows > 0) {
                        // Se o número da carteira já existir, gerar o PDF sem adicionar a nova entrada
                        echo '<script>alert("O número da carteira já está em uso. Gerando PDF...");</script>';
                        echo '<script>window.onload = function() { gerarPDF("'.$nameBenef.'", "'.$numberBenef.'", "'.$numberBenner.'"); }</script>';
                    } else {
                        $stmt = $con->prepare("INSERT INTO carteira (nome_beneficiario, numero_carteira, numero_benner) VALUES (?, ?, ?)");
                        $stmt->bind_param("sss", $nameBenef, $numberBenef, $numberBenner);
                        if ($stmt->execute()) {
                            echo '<script>alert("Beneficiário cadastrado com sucesso! Gerando PDF...");</script>';
                            echo '<script>window.onload = function() { gerarPDF("'.$nameBenef.'", "'.$numberBenef.'", "'.$numberBenner.'"); }</script>';
                        } else {
                            echo '<script>alert("Erro ao cadastrar beneficiário: ' . $con->error . '");</script>';
                        }
                    }
                } else {
                    echo "Erro na verificação: " . $con->error;
                }

            }
        }
    }
}
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RECIPREV | GERAR CARTEIRA</title>
    <link rel="stylesheet" href="assets/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body>
<header>
    <nav class="navbar fixed-top">
        <div class="container-fluid">
            <img src="assets/img/logo_prefeitura.png" alt="" width="80" height="80">

            <h5>GERAR CARTEIRA BENEFICIÁRIO</h5>

            <form action="index.php" method="POST">
                <div class="input-wrapper">
                <button type="submit-search" name="submit-search" class="icon">
                    <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M22 22L20 20"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    </svg>
                </button>
                <input type="text" name="searchNumber" class="input" placeholder="Pesquise o n° da carteira" />
                </div>
            </form>

          <a class="navbar-brand" href="#">
            <img src="assets/img/logo_reciprev.png" alt="" width="140" height="50">
          </a>
        </div>
    </nav> 
    <section>
        <div class="wrapper">
            <div class="credit-card" id="card">
                <div class="card-front">
                    <div class="branding">
                        <img class="logo-prefeitura2 z-3" src="assets/img/logo_prefeitura2.png" alt="" width="100" height="150">
                    </div>
                    <div class="branding">
                        <img class="logo_reciprev z-3" src="assets/img/logo_reciprev.png" alt="" width="90" height="35" >
                    </div>
                    <div class="branding-2 z-n1">
                        <img class="familia" src="assets/img/familia.png" alt="" width="215" height="215">
                    </div>
                    <div class="details">
                        <div>
                            <span id="card-holder-name"></span>
                        </div>
                    </div>
                    <div class="card-number z-3">
                        <div>
                            <span class="card-number-display" id="card-number-display"></span>
                        </div>
                    </div>
                    <div class="card-number z-3">
                        <div>
                            <span id="card-number-banner"></span>
                        </div>
                    </div>
                </div>
                <div class="card-back">
                    <div class="branding">
                        <img class="back-logo" src="assets/img/logo_reciprev.png" alt="" width="110" height="45">
                        <img class="logo_reci_back" src="assets/img/logo_prefeitura.png" alt="" width="55" height="55">
                    </div>
                    <div class="container">
                        <div class="title">
                            <span>PARA TER A SEGURANÇA E A <br> COMODIDADE DO ALÔ SAÚDE:</span><br>
                        </div>
                        <div class="number1">
                            <span>0800 300 2345</span><br>
                        </div>
                        <div class="number2">
                            <span>3771-0152</span><br>
                        </div>
                        <div class="caption">
                            <span>Ligações podem ser realizadas pelo telefone celular.</span>
                        </div>
                    </div>
                </div>
            </div>
            <br><br>

            <?php
            $nameBenef = isset($_GET['nameBenef']) ? $_GET['nameBenef'] : '';
            $numberBenef = isset($_GET['numberBenef']) ? $_GET['numberBenef'] : '';
            ?>
            <form id="formGerarCarteira" action="index.php" method = "POST">
                <label for="inputPassword5" class="form-label">Digite o nome do beneficiário</label>
                <input type="text" name="nameBenef" id="inputNameBenef" class="form-control mb-3" aria-describedby="passwordHelpBlock" value="<?php echo htmlspecialchars($nameBenef); ?>">
                <label for="inputPassword5" class="form-label">Digite o número da carteira</label>
                <input type="text" name="numberBenef" id="inputNumberBenef" class="form-control mb-3" aria-describedby="passwordHelpBlock" value="<?php echo htmlspecialchars($numberBenef); ?>">
                <label for="inputPassword5" class="form-label">Digite o número Benner</label>
                <input type="text" name="numberBenner" id="inputBanner" class="form-control" aria-describedby="passwordHelpBlock">
                <button type="submit" name = "submit" class="btn btn-success">Gerar Carteira</button>
            </form>

        </div>
    </section>
</header>

    <footer class="bg-body-tertiary text-center text-lg-start fixed-bottom footer">
        <div class="text-center p-1" style="background-color: rgba(0, 0, 0, 0.05);">
          <h6>RECIPREV - GERADOR DE CARTEIRA BENEFICIÁRIO v0.1</h6>
        </div>
    </footer>

    <script src="assets/index.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>


