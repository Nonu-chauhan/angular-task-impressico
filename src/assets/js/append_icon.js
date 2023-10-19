  
    const cssContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
        }
        
        /* Styles for the modal content */
        .modal-content {
            background-color: #fefefe;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #888;
            max-width: 60%;
        }
        
        /* Styles for form elements */
        .form-groups {
            // display: flex;
            // flex-direction: row;
            // justify-content: space-between;
            // margin-bottom: 10px;
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            // border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        
        label {
            flex: 1;
            margin-right: 10px;
            text-align: left;
        }
        
        input, select, textarea {
            flex: 2;
            margin-right: 20px;
        }
        
        button {
            background-color: #0074d9;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
        }
        
        button.cancel {
            background-color: #ccc;
        }
    `;
    
    
    function init_modal(options) {
        includeInlineCSS(cssContent);
        addModalOpenBtn(options);
        addModalAndForm(options)
        addFormEventListener(options);
    }

    function addModalOpenBtn(options) {
        var modalBtn = document.createElement("button")
        modalBtn.classList.add('openModalButton')
        modalBtn.innerText = options.modalOpenBtnText || 'Contact Service'
        // var modalOpenBtn = `<button id="openModalButton">${options.modalOpenBtnText || 'Contact Service'}</button>`;
        var modalBtnWrapper = document.getElementById(options.modalBtnWrapperId);
        appendChildElement(modalBtnWrapper, modalBtn)
    }

    function appendChildElement(parentElement, childElement) {
        if (childElement && parentElement) {
            parentElement.appendChild(childElement);
        }
    }

    function addModalAndForm(options) {
        var modal_html = `<div class="modal" id="myModal"> 
            <div class="modal-content"> 
                <h2 id="form-heading " class="text-center">${options.formHeading}</h2> 
                <form> 
                    <div class="form-groups"> 
                      <div class="row">
                        <div class="col-6">
                          <label for="name">Name:</label> 
                          <input type="text"  class="form-control" placeholder="Enter Name" id="name" name="name"> 
                        </div>
                        <div class="col-6">
                          <label for="phone">Phone:</label> 
                          <input type="text"  class="form-control" placeholder="Enter Phone" id="phone" name="phone"> 
                        </div>
                      </div>  
                    </div> 
                    <div class="form-groups">
                     <div class="row">
                      <div class="col-6">
                        <label for="email">Email:</label> 
                        <input type="text" id="email"  placeholder="Enter Email"  class="form-control"  name="email"> 
                      </div>
                      <div class="col-6"> 
                        <label for="vin">VIN:</label> 
                        <input type="text" id="vin" placeholder="Enter VIN"  class="form-control" name="vin"> 
                      </div>
                     </div>   
                    </div> 
                    <div class="form-groups">
                    <div class="row">
                      <div class="col-6">
                        <label for="category">Category:</label> 
                        <select id="category" class="form-control"  name="category"> 
                            <option value="select">Select Category</option>
                        </select> 
                       </div> 
                       <div class="col-6">
                        <label for="subcategory">SubCategory:</label> 
                        <select id="subcategory"   class="form-control" name="subcategory"> 
                            <option value="">Select SubCategory</option> 
                        </select> 
                        </div>
                      </div>  
                    </div> 
                    <div class="form-groups"> 
                     <div class="row">
                      <div class="col-6">
                        <label for="assignTo">Assign To:</label> 
                        <select id="assignTo"  class="form-control" name="assignTo"> 
                            <option value="User 1">User 1</option> 
                            <option value="User 2">User 2</option> 
                        </select> 
                      </div>  
                       <div class="col-6">
                        <label for="preferenceContact">Preference Contact:</label> 
                        <select id="preferenceContact"  class="form-control"  name="preferenceContact"> 
                            <option value="Contact 1">Select Contact</option> 
                        </select> 
                       </div>
                     </div>   
                    </div> 
                    <div class="form-groups"> 
                        <label for="testDescription">Test Description:</label> 
                        <textarea id="testDescription"  class="form-control" placeholder="Enter Description" name="testDescription" rows="3"></textarea> 
                    </div> 
                </form> 
                <div class="text-right" style="text-align:right">
                  <button class="btn btn-secondary" style="width:20%" id="cancelBtn" >Cancel</button> 
                  <button class="btn btn-primary" style="width:20%" id="submit-button">Submit</button> 
                </div> 
                
            </div> 
        </div>`
        var formDiv = document.createElement("div");
        formDiv.innerHTML = modal_html;
        appendChildElement(document.body, formDiv)
    }

    function addFormEventListener(options) {
        var subCategoryDataUrl = options.subCategoryDataUrl || 'https://dummyjson.com/products/category/'
        
        var openModalButton = document.querySelector('.openModalButton');
        openModalButton.addEventListener('click', onModalOpen)
        
        var cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click',onCoseModal)
        }
        const categoryDropdown = document.getElementById("category");
        categoryDropdown.addEventListener("change", function() {
            const selectedCategory = categoryDropdown.value;
            updateSubCategoryOptions(selectedCategory, subCategoryDataUrl);
        });

        const submitBtn = document.getElementById("submit-button")
        if(submitBtn) {
            submitBtn.addEventListener("click", onSubmitForm)
        }
    }

    function onSubmitForm() {
        alert("Thank you for submit, but the feature is under development!")
    }

    function onCoseModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }
    function onModalOpen(){
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
        setTimeout(()=> {
            var newCategories = [
                "select",
                "smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration",
                "furniture",
                "tops",
                "womens-dresses",
                "womens-shoes",
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "womens-watches",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
                "automotive",
                "motorcycle",
                "lighting"
              ]
            newCategories = newCategories.map(category => {
                return {
                    value: category,
                    label: capitalizeWords(category)
                }
            })
            updateCategoryOptions(newCategories)
        }, 1000)
    }

    function updateSubCategoryOptions(category, subCategoryDataUrl) {
        const subCategoryDropdown = document.getElementById("subcategory");        
        // Clear existing options        
        subCategoryDropdown.innerHTML = '';
        if (category === 'select') {
            const option = document.createElement("option");
            option.value = category;
            option.text = category.toUpperCase();
            subCategoryDropdown.appendChild(option);
            return
        }
        // Fetch data from the server based on the selected Category
        fetch(`${subCategoryDataUrl}${category}`)
            .then(response => response.json())
            .then(data => {
                // Add new options based on the fetched data
                products = data.products.map(item => item.title)
                products.forEach(subcategory => {     
                    const option = document.createElement("option");               
                    option.value = subcategory;
                    option.text = subcategory;
                    subCategoryDropdown.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching SubCategory data:', error);
            });
    }

    function updateCategoryOptions(categories) {
        var categoryDropdown = document.getElementById("category");
    
        // Clear existing options
        categoryDropdown.innerHTML = '';
    
        // Add new options based on the array of categories
        categories.forEach(function(category) {
            var option = document.createElement("option");
            option.value = category.value;
            option.text = category.label;
            categoryDropdown.appendChild(option);
        });
    }

    function capitalizeWords(inputString) {
        // Split the string by hyphens
        const words = inputString.split('-');
    
        // Capitalize the first letter of each word
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
        // Join the words to form the final string
        const resultString = capitalizedWords.join(' ');
    
        return resultString;
    }

    function includeInlineCSS(cssContent) {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        
        // Add your CSS content as text content
        if (styleElement.styleSheet) {
            // For Internet Explorer
            styleElement.styleSheet.cssText = cssContent;
        } else {
            styleElement.appendChild(document.createTextNode(cssContent));
        }
    
        // Append the style element to the <head> of the document
        document.head.appendChild(styleElement);
    }



    window.init_modal = init_modal

// function load_new_menu_icon(menu_item_wrapper_class,
//     menu_item_element_type,
//     menu_item_inner_text,
//     content_wraper_id
// ) {
//     var formDiv = document.createElement("div");
//     formDiv.innerHTML = modal_html;
//     appendChildToHtml(document.body, formDiv);
//     var modal = document.getElementById('myModal');
//     var openModalButton = document.getElementById('openModalButton');
//     var cancelBtn = document.getElementById('cancelBtn');

//     openModalButton.onclick = function() {
//         modal.style.display = 'block';
//         setTimeout(()=> {
//             var newCategories = ["New Option 1", "New Option 2", "New Option 3"];
//             updateCategoryOptions(newCategories)
//         }, 5000)
//     }

//     cancelBtn.onclick = function() {
//         modal.style.display = 'none';
//     }

//     function submitForm() {
//         // Handle form submission logic here
//         // You can access form data using JavaScript and send it to your server
//         closeModal(); // Close the modal after submission
//     }
    
//     const categoryDropdown = document.getElementById("category");
//     categoryDropdown.addEventListener("change", function() {
//         const selectedCategory = categoryDropdown.value;
//         updateSubCategoryOptions(selectedCategory);
//     });
// }

// // Function to update the SubCategory options
// function updateSubCategoryOptions(category) {
//     const subCategoryDropdown = document.getElementById("subcategory");

//     // Clear existing options
//     subCategoryDropdown.innerHTML = '';

//     // Fetch data from the server based on the selected Category
//     fetch(`${subCategoryDataUrl}?category=${category}`)
//         .then(response => response.json())
//         .then(data => {
//             // Add new options based on the fetched data
//             data.forEach(subcategory => {
//                 const option = document.createElement("option");
//                 option.value = subcategory;
//                 option.text = subcategory;
//                 subCategoryDropdown.appendChild(option);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching SubCategory data:', error);
//         });
// }

// function updateCategoryOptions(categories) {
//     var categoryDropdown = document.getElementById("category");

//     // Clear existing options
//     categoryDropdown.innerHTML = '';

//     // Add new options based on the array of categories
//     categories.forEach(function(category) {
//         var option = document.createElement("option");
//         option.value = category;
//         option.text = category;
//         categoryDropdown.appendChild(option);
//     });
// }

// window.load_new_menu_icon = load_new_menu_icon
// window.toggleClass = toggleClass