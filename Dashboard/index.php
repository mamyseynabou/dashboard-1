 <?php
// Paramètres de connexion à la base de données
$servername = "localhost"; // Nom de l'hôte (dans la plupart des cas, "localhost")
$username = "root"; // Nom d'utilisateur MySQL
$password = ""; // Mot de passe MySQL (laissez vide si vous n'en avez pas)
$dbname = "dashboard"; // Nom de la base de données

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}
echo "Connexion réussie à la base de données MySQL";

// Fermer la connexion
$conn->close();
?>
