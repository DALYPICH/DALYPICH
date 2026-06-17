const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

const maternityProcedure = {
  title: 'PROCEDURE OF PREGNANCY WOMEN, MATERNITY LEAVE AND RETURN TO WORK',
  type: 'Company Policy',
  content: `PROCEDURE OF PREGNANCY WOMEN, MATERNITY LEAVE AND RETURN TO WORK

I. OBJECTIVE:
This procedure gives all information regarding pregnancy and maternity leave.

II. SCOPE:
The procedure will be implemented to all employees.

III. RESPONSIBILITY AND AUTHORITY:
The HR/HR Dept are responsible to ensure that all departments follow the procedure for pregnancy and maternity leave, and to monitor and audit, and to make revisions and/or amendments when required.

IV. PROCEDURE:

A. PREGNANT EMPLOYEES:
1. An employee must report her pregnancy to the in-house clinic, as soon as she knows she is pregnant.
2. The Company Doctor is responsible for verifying the stage of the employee's pregnancy.
3. All Dept heads are responsible to ensure that pregnant employees have a chair available to them if they want to use during their working day- especially after 5 months of pregnancy.
4. If a pregnant employee is working in an area where the employee needs to be seated due to discomfort, then the employee can request to be transferred to a more appropriate job (with chair) for the duration of her pregnancy.
5. The Company will consider to transfer from dangerous working area such as Directly with Chemical or dangerous machines to any convenience area.

B. MATERNITY LEAVE:
1. A pregnant employee is entitled to 90 calendar days of maternity leave (before and after delivery).
2. The company doctor will advise the employee when the appropriate date to take leave is.
3. Maternity pay- during first year of employment this is without after the employee has more than 12 months of continuous service. she will be entitled to 50% of her wages and allowances paid by the Company.
4. The application for maternity leave shall be submitted and accompanied by a doctor's certificate a minimum of two weeks prior to the expected date for and to the employee, if necessary, for the employee concerned, during the maternity leave.
5. If the employee suffers a miscarriage less than 7 months pregnant will be given maternity leave- the duration of which will be as per the Company Doctor's recommendation. A miscarriage of 7 months or more, will be treated as maternity leave.
6. We encourage you to work lightly for 2 months after return from Maternity Leave.
7. You can take one month leave in case not well from pregnancy birth.

C. BREAST FEEDING:
1. After return from maternity leave, Company will allow one hour paid leave to breast feeding room in the Company breast feeding room.
2. Pending on your consideration for morning or afternoon shift and valid for 18 months of children age.

D. CHILD CARE COST OFFER MONEY INSTEAD OF CHILDCARE:
1. The Company will offer USD 9 per month for child care cost from 18 months old till 36 months old.`
};

const maternityQuestions = [
  '1.4.3.8', '1.4.3.9', '1.4.3.10',
  '1.7.5.5', '1.7.5.6',
  '1.8.1.1', '1.8.1.2', '1.8.5.1',
  '1.10.2.1', '1.10.2.2', '1.10.2.3', '1.10.2.4', '1.10.2.5'
];

async function restructureReferences() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📄 Restructuring reference documents...\n');

    let updateCount = 0;

    for (const qNum of maternityQuestions) {
      const item = await ChecklistItem.findOne({ questionNumber: qNum });
      
      if (!item) continue;

      // Remove the long procedure text from legal reference, keep only the Cambodia Law reference
      let cleanedRef = item.legalReference;
      if (cleanedRef && cleanedRef.includes('PROCEDURE OF PREGNANCY WOMEN')) {
        // Extract just the Cambodia Labour Law part
        cleanedRef = cleanedRef.split('\n\n**REFERENCE DOCUMENT')[0];
      }

      // Add reference document
      const refDocuments = item.referenceDocuments || [];
      
      // Check if document already exists
      const docExists = refDocuments.some(doc => doc.title === maternityProcedure.title);
      if (!docExists) {
        refDocuments.push(maternityProcedure);
      }

      await ChecklistItem.updateOne(
        { _id: item._id },
        { 
          $set: { 
            legalReference: cleanedRef,
            referenceDocuments: refDocuments,
            'translations.km.legalReference': cleanedRef,
            'translations.zh.legalReference': cleanedRef
          }
        }
      );

      updateCount++;
      console.log(`✅ ${qNum} - Document moved to Evidence section`);
    }

    console.log(`\n✅ Restructured ${updateCount} questions`);
    console.log('\n📊 Changes Made:');
    console.log('  ✅ Removed long procedure text from legal references');
    console.log('  ✅ Kept Cambodia Labour Law articles in RED section');
    console.log('  ✅ Added maternity procedure as reference document');
    console.log('  ✅ Documents now appear in Evidence & Documentation section');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

restructureReferences();
