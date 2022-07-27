
//đối tượng Validator
function Validator(options) {
    //options là 1 object có dạng như sau:(nó là đối số được truyền vào)
                        /* {
                                form: '#form-1',
                                rules: [
                                    Validator.isRequired('#fullname'),
                                    Validator.isEmail('#email'),
                                ]
                            } */

    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {}; // là 1 object có key là selector và 
                            // value là 1 mảng chứa tất cả các rule của selector đó.
                            /*{ "#email": (2) [ƒ, ƒ]
                                "#fullname": [ƒ]
                                "#password": [ƒ]
                                "#password"_confirmation: (2) [ƒ, ƒ] }  */
    // hàm thực hiện validate /////////////////////////////////////////
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        // console.log(selectorRules[rule.selector]);
        // lặp qua từng rule
        for(var i = 0; i < rules.length; ++i) {
            switch(inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked') ? "checked" : "");
                    
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if(errorMessage) break;
        }
        
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;   //nếu có lỗi return false
    }

    // lấy emlement của form cần validate
    var formElement = document.querySelector(options.form);
    if(formElement) {
        // khi submit form ////////////////////////////////////////////////////////////////////////////////
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;
            //lặp qua từng rule và validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);

                if(!isValid) {
                    isFormValid = false;
                }
            });

            //nếu người dùng nhập đầy đủ thông tin thì mới in ra kết quả
            if(isFormValid) {
                // trường hợp submit với javascript
                if(typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    //enableInputs là một nodeList(ko phải mảng) nên dùng Array.from để chuyển về thành mảng rồi mới reduce
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {
                                    // values[input.name] = "";
                                    return values;
                                }
                                if(!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                // trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }   
        }

        //lặp qua mỗi rule và xử lí(lắng nghe sự kiện blur, input,...) ////////////////////////////////////////
        options.rules.forEach((rule) => {
            // lưu lại tất cả các rules của mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            
            Array.from(inputElements).forEach(function(inputElement) {
                if(inputElement) {
                    //xử lí trường hợp blur khỏi input
                    inputElement.onblur = () => {
                        validate(inputElement, rule);
                    }
                    
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    // xử lí mỗi khi người dùng nhập vào input
                    inputElement.oninput = () => {
                        errorElement.innerText = '';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                    }
                }
            })
            
        })
    }
}

//định nghĩa các rules ///////////////////////////////////////////////
Validator.isRequired = function (selector, message) {
    return {
        selector,
        test(value) {
            return value.trim() ? undefined : message || "Vui lòng nhập trường này.";
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector,
        test(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Vui lòng nhập Email";
        }
    }
}

Validator.isPhoneNumber = function(selector) {
    return {
        selector,
        test(value) {
            var phoneno = /^\d{10}$/;
            if(value.match(phoneno)) {
                return undefined;
            }
            else {
                return "Vui lòng nhập đúng số điện thoại.";
            }
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector,
        test(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự.`;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector,
        test(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác.';
        }
    }
}
