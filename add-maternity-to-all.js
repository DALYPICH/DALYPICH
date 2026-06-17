const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

const maternityProcedure = `

**REFERENCE DOCUMENT: PROCEDURE OF PREGNANCY WOMEN, MATERNITY LEAVE AND RETURN TO WORK**

**I. OBJECTIVE:**
This procedure gives all information regarding pregnancy and maternity leave.

**II. SCOPE:**
The procedure will be implemented to all employees.

**III. RESPONSIBILITY AND AUTHORITY:**
The HR/HR Dept are responsible to ensure that all departments follow the procedure for pregnancy and maternity leave, and to monitor and audit, and to make revisions and/or amendments when required.

**IV. PROCEDURE:**

**A. PREGNANT EMPLOYEES:**
1. An employee must report her pregnancy to the in-house clinic, as soon as she knows she is pregnant.
2. The Company Doctor is responsible for verifying the stage of the employee's pregnancy.
3. All Dept heads are responsible to ensure that pregnant employees have a chair available to them if they want to use during their working day- especially after 5 months of pregnancy.
4. If a pregnant employee is working in an area where the employee needs to be seated due to discomfort, then the employee can request to be transferred to a more appropriate job (with chair) for the duration of her pregnancy.
5. The Company will consider to transfer from dangerous working area such as Directly with Chemical or dangerous machines to any convenience area.

**B. MATERNITY LEAVE:**
1. A pregnant employee is entitled to 90 calendar days of maternity leave (before and after delivery).
2. The company doctor will advise the employee when the appropriate date to take leave is.
3. Maternity pay- during first year of employment this is without after the employee has more than 12 months of continuous service. she will be entitled to 50% of her wages and allowances paid by the Company.
4. The application for maternity leave shall be submitted and accompanied by a doctor's certificate a minimum of two weeks prior to the expected date for and to the employee, if necessary, for the employee concerned, during the maternity leave.
5. If the employee suffers a miscarriage less than 7 months pregnant will be given maternity leave- the duration of which will be as per the Company Doctor's recommendation. A miscarriage of 7 months or more, will be treated as maternity leave.
6. We encourage you to work lightly for 2 months after return from Maternity Leave.
7. You can take one month leave in case not well from pregnancy birth.

**C. BREAST FEEDING:**
1. After return from maternity leave, Company will allow one hour paid leave to breast feeding room in the Company breast feeding room.
2. Pending on your consideration for morning or afternoon shift and valid for 18 months of children age.

**D. CHILD CARE COST OFFER MONEY INSTEAD OF CHILDCARE:**
1. The Company will offer USD 9 per month for child care cost from 18 months old till 36 months old.
`;

// All maternity-related questions across all sections
const maternityQuestions = [
  // Section 1.4 - Discrimination (Maternity-related)
  '1.4.3.8',   // Pregnancy tests prohibited
  '1.4.3.9',   // Maternity leave
  '1.4.3.10',  // Employment terms during maternity
  
  // Section 1.7 - Compensation (Maternity)
  '1.7.5.5',   // Maternity leave payment
  '1.7.5.6',   // Breastfeeding time
  
  // Section 1.8 - HR (Maternity-related)
  '1.8.1.1',   // HR policies
  '1.8.1.2',   // HR policies and worker rights
  '1.8.5.1',   // Worker-management engagement
  
  // Section 1.10 - Working Time (Leave)
  '1.10.2.1',  // Annual leave minimum
  '1.10.2.2',  // Special leave
  '1.10.2.3',  // Sick leave
  '1.10.2.4',  // Maternity leave
  '1.10.2.5',  // Breastfeeding break
];

async function addMaternityToAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📄 Adding Maternity Procedure to ALL maternity-related questions...\n');

    let updateCount = 0;

    for (const qNum of maternityQuestions) {
      const item = await ChecklistItem.findOne({ questionNumber: qNum });
      
      if (!item) {
        console.log(`⚠️  Question ${qNum} not found`);
        continue;
      }

      // Check if procedure already added
      if (item.legalReference && item.legalReference.includes('PROCEDURE OF PREGNANCY WOMEN')) {
        console.log(`⏭️  ${qNum} - Already has procedure`);
        continue;
      }

      // Add maternity procedure to legal reference
      const updatedRef = (item.legalReference || '') + maternityProcedure;

      await ChecklistItem.updateOne(
        { _id: item._id },
        { 
          $set: { 
            legalReference: updatedRef,
            'translations.km.legalReference': updatedRef,
            'translations.zh.legalReference': updatedRef
          }
        }
      );

      updateCount++;
      console.log(`✅ Updated ${qNum}`);
    }

    console.log(`\n✅ Added Maternity Procedure Reference to ${updateCount} questions`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addMaternityToAll();
