🏠 AIR-DND: The Go-To Rental Management System  

A **House Rental Management System** designed to simplify and digitalize the process of managing rental properties.  
Traditional rental management involves manual record-keeping, delayed communication, and difficulty tracking rent payments and maintenance requests.  
**AIR-DND** solves these challenges by providing a centralized platform where landlords and tenants can interact efficiently.

---

👥 Made By  
- **Dhruv Pathak** (U24CS018)  
- **Nandini Ghosh** (U24CS013)

---

📜 Description  

The system automates key tasks such as **rent collection, tenant management, lease tracking, and maintenance scheduling**, ensuring accuracy, transparency, and convenience for both landlords and tenants.  
It serves as a bridge between property owners and renters by offering a structured and efficient way to manage all aspects of rental properties in one place.

---

 🚀 Features  

✅ **Landlord and Tenant Management**  
✅ **Property Listing and Tracking**  
✅ **Lease Management**  
✅ **Automated Rent and Payment Records**  
✅ **Maintenance Request System**  
✅ **Relational Database with BCNF-compliant Design**  
✅ **User-friendly Interface**

---

 🧱 Tech Stack  

| Component | Technology |
|------------|-------------|
| **Frontend** | HTML, CSS *(and basic JavaScript if used)* |
| **Backend** | PHP (via XAMPP) |
| **Database** | MySQL |
| **Tools** | XAMPP, phpMyAdmin, VS Code |
| **Version Control** | Git & GitHub |

---

🗂️ Entities and Attributes  

**1. Tenant** – (Tenant_ID, Name, Phone_Number, Email, Occupation, Permanent_Address)  
**2. Landlord** – (Landlord_ID, Name, Phone_Number, Email, Bank_acc)  
**3. Property** – (Prop_ID, Address, Type, Rent_Amount, Status, Landlord_ID)  
**4. Lease** – (Lease_ID, Start_Date, End_Date, Monthly_Rent, Deposit, Tenant_ID, Prop_ID)  
**5. Payment** – (Pay_ID, Pay_Date, Amount, Pay_Method, Tenant_ID, Lease_ID)  
**6. Maintenance** – (Req_ID, Req_Date, Description, Status, Prop_ID, Tenant_ID)  

---

⚙️ Database Relationships  

- A **Landlord** can own multiple **Properties**  
- A **Property** can be associated with one **Lease**  
- A **Lease** links a **Tenant** to a **Property**  
- **Payments** belong to a specific **Lease** and **Tenant**  
- **Maintenance Requests** are raised by **Tenants** for specific **Properties**

---

🧩 Normalization  

All relations have been normalized up to **BCNF (Boyce-Codd Normal Form)** to ensure data integrity and eliminate redundancy.
