// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const fournisseursForm = `
        <h2>Fournisseurs</h2>
        <form id="fournisseursForm">
            <label for="fournisseurName">Nom:</label>
            <input type="text" id="fournisseurName" name="name" required>
            <label for="fournisseurContact">Contact:</label>
            <input type="text" id="fournisseurContact" name="contact" required>
            <label for="fournisseurTelephone">telephone:</label>
            <input type="number" id="fournisseurTelephone" name="telephone" required>
            <button type="submit">Enregistrer</button>
        </form>
    `;
    const produitsForm = `
        <h2>Produits</h2>
        <form id="produitsForm">
            <label for="produitName">Nom:</label>
            <input type="text" id="produitName" name="name" required>
            <label for="produitPrice">Prix:</label>
            <input type="number" id="produitPrice" name="price" required>
            <button type="submit">Enregistrer</button>
        </form>
    `;
    const clientsForm = `
        <h2>Clients</h2>
        <form id="clientsForm">
            <label for="clientName">Nom:</label>
            <input type="text" id="clientName" name="name" required>
            <label for="clientEmail">Email:</label>
            <input type="email" id="clientEmail" name="email" required>
            <button type="submit">Enregistrer</button>
        </form>
    `;
    const commandesForm = `
        <h2>Commandes</h2>
        <form id="commandesForm">
            <label for="commandeClient">Client:</label>
            <input type="text" id="commandeClient" name="client" required>
            <label for="commandeProduit">Produit:</label>
            <input type="text" id="commandeProduit" name="produit" required>
            <label for="commandeQuantite">Quantité:</label>
            <input type="number" id="commandeQuantite" name="quantite" required>
            <button type="submit">Enregistrer</button>
        </form>
    `;

    document.getElementById('content').innerHTML = fournisseursForm;

    document.getElementById('fournisseurs').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('content').innerHTML = fournisseursForm;
        attachFormSubmit('fournisseursForm', 'http://localhost:3000/api/fournisseurs');
    });

    document.getElementById('produits').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('content').innerHTML = produitsForm;
        attachFormSubmit('produitsForm', 'http://localhost:3000/api/produits');
    });

    document.getElementById('clients').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('content').innerHTML = clientsForm;
        attachFormSubmit('clientsForm', 'http://localhost:3000/api/clients');
    });

    document.getElementById('commandes').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('content').innerHTML = commandesForm;
        attachFormSubmit('commandesForm', 'http://localhost:3000/api/commandes');
    });

    attachFormSubmit('fournisseursForm', 'http://localhost:3000/api/fournisseurs');
});

function attachFormSubmit(formId, apiEndpoint) {
    document.getElementById(formId).addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert('Données enregistrées avec succès!');
            this.reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'enregistrement des données.');
        });
    });
}
