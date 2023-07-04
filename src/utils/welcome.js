const welcome = () => {
  const html = `
  <head>
  <title>Welcome to the API</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding-top: 100px;
    }
    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
    }
    a {
      color: #337ab7;
      text-decoration: none;
    }
    ul {
      list-style: none;
    }
    .profile-image {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Welcome to the E-COMMERCE API</h1>
  <p>Made with passion and caffeine by <a href="https://github.com/GuillermoBPY">GuillermoBPY</a></p>
  <p>Thank you for visiting our API. We hope you find the information you need.</p>

  <p>Here are some useful links:</p>
  <ul>
    <li><a href="https://e-commerce-guillermobpy.netlify.app/" target="_blank">API deployed on netlify</a></li>
    <li><a href="https://e-commerce-api-plez.onrender.com/api/v1/products" target="_blank">View products</a></li>
    <li><a href="https://e-commerce-api-plez.onrender.com/api/v1/categories" target="_blank">View categories</a></li>
  </ul>

  <img src="./../guillermobpy.png" alt="Profile image" class="profile-image">
  
  <p>
    <a href="https://github.com/GuillermoBPY" target="_blank">My GitHub</a> |
    <a href="https://www.linkedin.com/in/guillermobpy/" target="_blank">My LinkedIn</a>
  </p>
</body>

  `;

  return html;
};

module.exports = welcome;
