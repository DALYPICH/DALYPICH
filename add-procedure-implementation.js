const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Procedure Implementation and Authority Reference
const procedureImplementationRef = `
**REFERENCE DOCUMENT: PROCEDURE IMPLEMENTATION AND AUTHORITY**

**EFFECTIVE DATE:**
This procedure comes into effect from the date of signing.

**MANAGEMENT AUTHORITY AND MODIFICATION:**
The management reserves the right to change any version of this procedure at any time and when deemed necessary and only the authorized manager is allowed to do so.

**KEY PRINCIPLES:**
- Procedures are binding on all employees from effective date
- Management has authority to modify procedures as needed
- Only authorized managers can implement changes
- Changes take effect when deemed necessary by management
- All employees must comply with current procedure versions
`;

// Questions related to HR policies and management authority
const questionsToUpdate = [
  // HR Policies and Systems
  '1.8.1.1',   // HR policies documented
  '1.8.1.2',   // HR policies address worker rights
  '1.8.1.3',   // HR department qualified staff
  '1.8.1.25',  // HR systems regularly reviewed
  
  // Internal Regulations/Shop Rules
  '1.7.2.1',   // Internal regulations exist
  '1.7.2.2',   // Shop rules changed with consultation
  '1.7.2.3',   // Internal regulations comply with law
  
  // Management Policies
  '1.8.5.1',   // Management communication channels
  '1.8.5.2',   // Management meets with worker reps
  '1.8.5.4',   // Grievance procedures accessible
];

async function addProcedureImplementation() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📄 Adding Procedure Implementation and Authority Reference...\n');

    let updateCount = 0;

    for (const qNum of questionsToUpdate) {
      const item = await ChecklistItem.findOne({ questionNumber: qNum });
      
      if (!item) {
        console.log(`⚠️  Question ${qNum} not found`);
        continue;
      }

      // Add reference to legalReference field
      const updatedRef = (item.legalReference || '') + '\n\n' + procedureImplementationRef;

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

    console.log(`\n✅ Added Procedure Implementation Reference to ${updateCount} questions`);
    console.log('\n📊 Reference Document Added:');
    console.log('  ✅ Effective date implementation');
    console.log('  ✅ Management authority and modification rights');
    console.log('  ✅ Authorized manager requirements');
    console.log('  ✅ Employee compliance obligations');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addProcedureImplementation();
