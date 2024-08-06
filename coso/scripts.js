function calculate() {
    // Obtener valores de los campos
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    let time = parseFloat(document.getElementById('time').value);
    const periodType = document.getElementById('periodType').value;
    const calculationType = document.getElementById('calculationType').value;

    // Ajustar el tiempo según el tipo de período
    let periods;
    switch (periodType) {
        case 'semestres':
            periods = time * 2;
            break;
        case 'trimestres':
            periods = time * 4;
            break;
        case 'bimestres':
            periods = time * 6;
            break;
        case 'años':
        default:
            periods = time;
            break;
    }

    let results = [];

    switch (calculationType) {
        case 'simple':
            for (let i = 1; i <= periods; i++) {
                let interest = principal * rate * i;
                let totalAmount = principal + interest;
                results.push({ period: i, interest: interest.toFixed(2), totalAmount: totalAmount.toFixed(2) });
            }
            break;
        case 'compuesto':
            for (let i = 1; i <= periods; i++) {
                let totalAmount = principal * Math.pow((1 + rate), i);
                let interest = totalAmount - principal;
                results.push({ period: i, interest: interest.toFixed(2), totalAmount: totalAmount.toFixed(2) });
            }
            break;
        case 'valorFuturo':
            for (let i = 1; i <= periods; i++) {
                let annuityFutureValue = (principal * (Math.pow(1 + rate, i) - 1)) / rate;
                results.push({ period: i, interest: 'N/A', totalAmount: annuityFutureValue.toFixed(2) });
            }
            break;
        case 'valorPresente':
            for (let i = 1; i <= periods; i++) {
                let annuityPresentValue = principal * ((1 - Math.pow(1 + rate, -i)) / rate);
                results.push({ period: i, interest: 'N/A', totalAmount: annuityPresentValue.toFixed(2) });
            }
            break;
    }

    // Mostrar resultado
    let resultHtml = `
        <div class="result-header">
            <div class="result-period">Periodo</div>
            <div class="result-interest">Interés</div>
            <div class="result-total">Monto Total</div>
        </div>
    `;
    results.forEach(result => {
        resultHtml += `
            <div class="result-item">
                <div class="result-period">${result.period}</div>
                <div class="result-interest">$${result.interest}</div>
                <div class="result-total">$${result.totalAmount}</div>
            </div>
        `;
    });

    document.getElementById('result').innerHTML = resultHtml;
}
