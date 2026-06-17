const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Map this document to relevant questions
const maternityProcedureReference = `
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

// Questions this relates to (by section)
const questionsToUpdate = [
  // Section 1.7 - Maternity Leave related
  '1.7.5.5',  // Maternity leave questions
  '1.7.5.6',  // Breastfeeding time
  '1.8.1.1',  // HR policies
  '1.8.1.2',  // HR policies addressing worker rights
  '1.8.5.1',  // Worker-management engagement
  '1.8.5.2',  // Management consultation
];

async function addMaternityProcedure() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📄 Adding Maternity Procedure Reference Document...\n');

    let updateCount = 0;

    for (const qNum of questionsToUpdate) {
      const item = await ChecklistItem.findOne({ questionNumber: qNum });
      
      if (!item) {
        console.log(`⚠️  Question ${qNum} not found`);
        continue;
      }

      // Add reference to legalReference field
      const updatedRef = (item.legalReference || '') + '\n\n' + maternityProcedureReference;

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
      console.log(`✅ Updated ${qNum} with maternity procedure reference`);
    }

    console.log(`\n✅ Added Maternity Procedure Reference to ${updateCount} questions`);
    console.log('\n📊 Reference Document Added:');
    console.log('  ✅ Pregnancy procedures');
    console.log('  ✅ 90-day maternity leave details');
    console.log('  ✅ Breast feeding provisions');
    console.log('  ✅ Child care cost assistance');
    console.log('  ✅ Return to work procedures');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addMaternityProcedure();
