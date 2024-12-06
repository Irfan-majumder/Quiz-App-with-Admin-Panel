
    document.addEventListener('DOMContentLoaded', function() {
        // Toggle between login and signup
        const signupBtn = document.querySelector('.signup-btn');
        const loginBtn = document.querySelector('.login-btn');
        const loginBox = document.querySelector('.login-box');
        const signupBox = document.querySelector('.signup-box');

        signupBtn.addEventListener('click', function() {
            loginBox.classList.remove('active');
            signupBox.classList.add('active');
            loginBtn.classList.remove("d-none");
            signupBtn.classList.add("d-none");
        });

        loginBtn.addEventListener('click', function() {
            signupBox.classList.remove('active');
            loginBox.classList.add('active');
            loginBtn.classList.add("d-none");
            signupBtn.classList.remove("d-none");
        });

        // Signup form handling
        const signupForm = document.getElementById('signup-form');
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const brandCode = document.getElementById('brand-code').value.trim();
            const brandName = document.getElementById('brand-name').value.trim();
            const website = document.getElementById('website').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const address = document.getElementById('address').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('s-password').value;

            // Check if brand code already exists
            if (localStorage.getItem(brandCode) !== null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Brand Code is already taken. Please choose a different Brand Code.'
                });
                return;
            }

            const userData = {
                brandCode,
                brandName,
                website,
                contact,
                address,
                username,
                password: btoa(password) // Basic obfuscation
            };

            try {
                localStorage.setItem(brandCode, JSON.stringify(userData));

                signupForm.reset();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your brand has been registered successfully!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Switch to login box after successful registration
                    signupBox.classList.remove('active');
                    loginBox.classList.add('active');
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: 'Unable to complete registration. Please try again.'
                });
                console.error('Registration error:', error);
            }
        });

        // Login form handling
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const brandCode = document.getElementById('login-brand-code').value.trim();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;

            // Retrieve user data
            const storedUserData = localStorage.getItem(brandCode);

            if (!storedUserData) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Brand Code not found. Please register first.'
                });
                return;
            }

            const userData = JSON.parse(storedUserData);

            // Compare credentials
            if (userData.username === username && userData.password === btoa(password)) {

                
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${userData.brandName}!`
                    }).then(() => {

                        // Store brand code in session storage BEFORE redirecting
                           sessionStorage.setItem('brandCode', brandCode);
                        
                        // Switch to dashboard box after successful login
                        
                      //  loginBox.innerHTML="please wait...";
                       // loginBox.disabled = true;
                        setTimeout(() => {
                            window.location = "../Dashboard/dashboard.html";
                           
                       
                   }, 500);
                            
                    
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password.'
                });
            }
        });
    });
    