        // Contact class
        class Contact {
            constructor(name, phone) {
                this.name = name;
                this.phone = phone;
            }
        }

        // Doubly linked list node
        class Node {
            constructor(contact) {
                this.contact = contact;
                this.prev = null;
                this.next = null;
            }
        }

        // Doubly linked list
        class DoublyLinkedList {
            constructor() {
                this.head = null;
                this.tail = null;
            }

            add(contact) {
                let node = new Node(contact);

                if (this.head === null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.prev = this.tail;
                    this.tail.next = node;
                    this.tail = node;
                }
            }
        }

        // Contact manager
        let contacts = new DoublyLinkedList();

        // Hash table
        let hashTable = {};

        // Add contact
        function addContact() {
            let name = document.getElementById("name").value.trim();
            let phone = document.getElementById("phone").value.trim();

            if (name === "" || phone === "") {
                showMessage("Please enter both name and phone.");
                return;
            }

            let key = name.toLowerCase();

            if (Object.prototype.hasOwnProperty.call(hashTable, key)) {
                showMessage("This contact already exists.");
                return;
            }

            let contact = new Contact(name, phone);

            contacts.add(contact);
            hashTable[key] = contact;

            showMessage("Contact added successfully.");

            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
        }

        // Naive substring search
        function containsSubstring(text, keyword) {
            text = text.toLowerCase();
            keyword = keyword.toLowerCase();

            for (let i = 0; i <= text.length - keyword.length; i++) {
                let j = 0;

                while (
                    j < keyword.length &&
                    text[i + j] === keyword[j]
                ) {
                    j++;
                }

                if (j === keyword.length) {
                    return true;
                }
            }

            return false;
        }

        // Search by keyword
        function searchKeyword() {
            let keyword = document.getElementById("keyword").value.trim();
            let current = contacts.head;
            let found = false;

            clearResults();

            if (keyword === "") {
                showMessage("Enter a keyword.");
                return;
            }

            while (current !== null) {
                let contact = current.contact;

                if (containsSubstring(contact.name, keyword)) {
                    displayContact(contact);
                    found = true;
                }

                current = current.next;
            }

            showMessage(found ? "Matching contacts:" : "No matches found.");
        }

        // Search by exact name using hash table
        function searchName() {
            let name = document.getElementById("searchName").value.trim();
            let key = name.toLowerCase();

            clearResults();

            if (Object.prototype.hasOwnProperty.call(hashTable, key)) {
                displayContact(hashTable[key]);
                showMessage("Contact found.");
            } else {
                showMessage("Contact not found.");
            }
        }

        // Display contacts from head to tail
        function displayForward() {
            let current = contacts.head;

            clearResults();

            while (current !== null) {
                displayContact(current.contact);
                current = current.next;
            }

            showMessage("Contacts displayed in forward order.");
        }

        // Display contacts from tail to head
        function displayBackward() {
            let current = contacts.tail;

            clearResults();

            while (current !== null) {
                displayContact(current.contact);
                current = current.prev;
            }

            showMessage("Contacts displayed in backward order.");
        }

        // Display one contact
        function displayContact(contact) {
            let li = document.createElement("li");
            li.textContent = contact.name + " - " + contact.phone;

            document.getElementById("results").appendChild(li);
        }

        // Clear previous results
        function clearResults() {
            document.getElementById("results").innerHTML = "";
            document.getElementById("message").textContent = "";
        }

        // Show a message
        function showMessage(message) {
            document.getElementById("message").textContent = message;
        }