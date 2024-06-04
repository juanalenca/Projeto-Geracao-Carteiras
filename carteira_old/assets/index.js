// const inputNumberBenef = document.getElementById("inputNumberBenef");
// const inputNameBenef = document.getElementById("inputNameBenef");
// const inputBanner = document.getElementById("inputBanner");

// const numberBenefDisplay = document.querySelectorAll(".card-number-display");


// // Adiciona um ouvinte de eventos de entrada para o número do cartão
// inputNumberBenef.addEventListener("input", () => {
//  // Verifica se o número do cartão excede 30 caracteres
//   if (inputNumberBenef.value.length > 30) {
//     inputNumberBenef.value = inputNumberBenef.value.slice(0, 100);
//   }

//   // Obtém o elemento de exibição do número do cartão
//   const cardHolderNumber = document.getElementById("card-number-display");
//   // Define o texto do número do cartão com base no valor de entrada
//   cardHolderNumber.textContent = inputNumberBenef.value.length === 0 ? "" : inputNumberBenef.value;
//   // Define estilos para o número do cartão
//   cardHolderNumber.style.fontSize = "17px";
//   cardHolderNumber.style.fontWeight = "bold";
// });

// // Adiciona um ouvinte de eventos de entrada para o nome no cartão
// inputNameBenef.addEventListener("input", () => {
//     // Verifica se o nome no cartão excede 30 caracteres
//     if (inputNameBenef.value.length > 30) {
//         inputNameBenef.value = inputNameBenef.value.slice(0, 100);
//     }

//    // Obtém o elemento de exibição do nome no cartão
//     const cardHolderName = document.getElementById("card-holder-name");
//      // Define o texto do nome no cartão com base no valor de entrada
//     cardHolderName.textContent = inputNameBenef.value.length === 0 ? "" : inputNameBenef.value;
//     // Define estilos para o nome no cartão
//     cardHolderName.style.fontSize = "17px";
//     cardHolderName.style.fontWeight = "bold";
// });


// // Adiciona um ouvinte de eventos de entrada para o banner do cartão
// inputBanner.addEventListener("input", () => {
// // Verifica se o texto do banner no cartão excede 50 caracteres  
//   if (inputBanner.value.length > 50) {
//     inputBanner.value = inputBanner.value.slice(0, 100);
//   }

//   // Obtém o elemento de exibição do banner no cartão
//   const cardHolderBanner = document.getElementById("card-number-banner");
//   // Define o texto do banner no cartão com base no valor de entrada
//   cardHolderBanner.textContent = inputBanner.value.length === 0 ? "" : inputBanner.value;
//   // Define estilos para o banner no cartão
//   cardHolderBanner.style.fontSize = "17px";
//   cardHolderBanner.style.fontWeight = "bold";
// });


// // Adiciona um ouvinte de eventos de clique para o botão de geração de PDF
// document.querySelector('.btn.btn-success').addEventListener('click', function () {
//   var cardFront = document.querySelector('.card-front');
//   var cardBack = document.querySelector('.card-back');


//   // Esconde o verso do cartão temporariamente
//   cardBack.style.display = "none";

//   // Captura uma imagem da fente do cartão usando html2canvas
//   html2canvas(cardFront).then(function(canvasFront) {
//       var imgDataFront = canvasFront.toDataURL('image/png');

//       // Exibe novamente o verso do cartão
//       cardBack.style.display = "block";
//       cardBack.style.transform = "scaleX(1)";

//       // Captura uma imagem do verso do cartão usando html2canvas
//       html2canvas(cardBack).then(function(canvasBack) {
//           var imgDataBack = canvasBack.toDataURL('image/png');

//            // Esconde o verso do cartão novamente
//           cardBack.style.display = "none";
          
//           // Cria um novo documento PDF
//           var pdf = new jsPDF('p', 'mm', [210, 297]); 
          
//           // Define as dimensões e a margem para as imagens do cartão
//           var width = 30; 
//           var height = 20; 
//           var marginLeft = (pdf.internal.pageSize.getWidth() - 2 * width) / 3;
//           var marginTop = (pdf.internal.pageSize.getHeight() - height) / 10;

//           // Adiciona as imagens da frente e do verso do cartão ao PDF
//           pdf.addImage(imgDataFront, 'PNG', marginLeft, marginTop, width, height);
//           // Reduzir a margem à esquerda do segundo cartão
//           var marginLeftSecondCard = marginLeft / 25; // Reduz a margem à esquerda do segundo cartão
//           pdf.addImage(imgDataBack, 'PNG', marginLeft + width + marginLeftSecondCard, marginTop, width, height);
          
//           // Cria uma URL temporária para o PDF
//           var pdfURL = pdf.output('bloburl');

//           // Abre o PDF em uma nova aba do navegador
//           window.open(pdfURL, '_blank');

//       });
//   });
// });



// document.addEventListener("DOMContentLoaded", function () {
//     const inputNumberBenef = document.getElementById("inputNumberBenef");
//     const inputNameBenef = document.getElementById("inputNameBenef");
//     const inputBanner = document.getElementById("inputBanner");

//     inputNumberBenef.addEventListener("input", () => {
//         if (inputNumberBenef.value.length > 30) {
//             inputNumberBenef.value = inputNumberBenef.value.slice(0, 100);
//         }
//         const cardHolderNumber = document.getElementById("card-number-display");
//         cardHolderNumber.textContent = inputNumberBenef.value.length === 0 ? "" : inputNumberBenef.value;
//         cardHolderNumber.style.fontSize = "17px";
//         cardHolderNumber.style.fontWeight = "bold";
//     });

//     inputNameBenef.addEventListener("input", () => {
//         if (inputNameBenef.value.length > 30) {
//             inputNameBenef.value = inputNameBenef.value.slice(0, 100);
//         }
//         const cardHolderName = document.getElementById("card-holder-name");
//         cardHolderName.textContent = inputNameBenef.value.length === 0 ? "" : inputNameBenef.value;
//         cardHolderName.style.fontSize = "17px";
//         cardHolderName.style.fontWeight = "bold";
//     });

//     inputBanner.addEventListener("input", () => {
//         if (inputBanner.value.length > 50) {
//             inputBanner.value = inputBanner.value.slice(0, 100);
//         }
//         const cardHolderBanner = document.getElementById("card-number-banner");
//         cardHolderBanner.textContent = inputBanner.value.length === 0 ? "" : inputBanner.value;
//         cardHolderBanner.style.fontSize = "17px";
//         cardHolderBanner.style.fontWeight = "bold";
//     });

//     document.querySelector('.btn.btn-success').addEventListener('click', function (event) {
//         event.preventDefault();
//         console.log("Button clicked");

//         var cardFront = document.querySelector('.card-front');
//         var cardBack = document.querySelector('.card-back');

//         cardBack.style.display = "none";
//         html2canvas(cardFront).then(function (canvasFront) {
//             var imgDataFront = canvasFront.toDataURL('image/png');
//             cardBack.style.display = "block";
//             cardBack.style.transform = "scaleX(1)";

//             html2canvas(cardBack).then(function (canvasBack) {
//                 var imgDataBack = canvasBack.toDataURL('image/png');
//                 cardBack.style.display = "none";

//                 // Especifica o tamanho da página do PDF (por exemplo, A5)
//                 var pdf = new jsPDF({
//                     orientation: 'p', // 'p' para retrato, 'l' para paisagem
//                     unit: 'mm',
//                     format: [210, 297] // A5 tamanho em mm (largura x altura)
//                 });

//                  // Define o tamanho das imagens no PDF
//                 var width = pdf.internal.pageSize.getWidth() * 0.4; // Define a largura como 40% da largura da página
//                 var height = pdf.internal.pageSize.getHeight() * 0.4; // Define a altura como 40% da altura da página

//                 // Define a margem entre os cartões
//                 var marginBetweenCards = pdf.internal.pageSize.getWidth() * 0.1; // Define a margem como 10% da largura da página

//                 // Adiciona as imagens dos cartões ao PDF
//                 pdf.addImage(imgDataFront, 'PNG', marginLeft, marginTop, width, height);
//                 pdf.addImage(imgDataBack, 'PNG', marginLeft + width + marginBetweenCards, marginTop, width, height);

//                 var pdfURL = pdf.output('bloburl');
//                 window.open(pdfURL, '_blank');
//             }).catch(function (error) {
//                 console.error("Error capturing card back:", error);
//             });
//         }).catch(function (error) {
//             console.error("Error capturing card front:", error);
//         });
//     });
// });



document.addEventListener("DOMContentLoaded", function () {
    const inputNumberBenef = document.getElementById("inputNumberBenef");
    const inputNameBenef = document.getElementById("inputNameBenef");
    const inputBanner = document.getElementById("inputBanner");

    inputNumberBenef.addEventListener("input", () => {
        const cardHolderNumber = document.getElementById("card-number-display");
        cardHolderNumber.textContent = inputNumberBenef.value;
    });

    inputNameBenef.addEventListener("input", () => {
        const cardHolderName = document.getElementById("card-holder-name");
        cardHolderName.textContent = inputNameBenef.value;
    });

    inputBanner.addEventListener("input", () => {
        const cardHolderBanner = document.getElementById("card-number-banner");
        cardHolderBanner.textContent = inputBanner.value;
    });

    document.querySelector('.btn.btn-success').addEventListener('click', function (event) {
        event.preventDefault();
        gerarPDF();
    });

    function gerarPDF() {
        var cardFront = document.querySelector('.card-front');
        var cardBack = document.querySelector('.card-back');

        html2canvas(cardFront).then(function (canvasFront) {
            var imgDataFront = canvasFront.toDataURL('image/png');

            html2canvas(cardBack).then(function (canvasBack) {
                var imgDataBack = canvasBack.toDataURL('image/png');

                var pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: [210, 297]
                });

                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
                var cardWidth = 85.6; // largura padrão do cartão de crédito em mm
                var cardHeight = 53.98; // altura padrão do cartão de crédito em mm
                var marginLeft = (pageWidth - cardWidth * 2) / 3; // margem esquerda
                var marginTop = (pageHeight - cardHeight) / 2; // margem superior

                pdf.addImage(imgDataFront, 'PNG', marginLeft, marginTop, cardWidth, cardHeight);
                pdf.addImage(imgDataBack, 'PNG', marginLeft * 2 + cardWidth, marginTop, cardWidth, cardHeight);

                pdf.save('carteira_beneficiario.pdf');
            }).catch(function (error) {
                console.error("Error capturing card back:", error);
            });
        }).catch(function (error) {
            console.error("Error capturing card front:", error);
        });
    }
});



