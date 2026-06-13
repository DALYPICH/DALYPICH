// Comprehensive advice and reminders for all 259 ILO checklist questions
// This mapping provides practical guidance for each question

const comprehensiveAdvice = {
  // 2.1 Key Strengths and Process Integrity
  '2.1.1.1': {
    commonProblems: 'Factories may lack awareness of their own strengths; management may not communicate progress to workers',
    advice: 'Document all improvements, certifications, and positive practices. Share achievements with employees to boost morale and reinforce compliance culture.',
    reminder: '💡 Recognizing strengths builds momentum for continued improvement and demonstrates commitment to Better Work assessment.'
  },
  '2.1.1.2': {
    commonProblems: 'Factories may deny assessor access to certain areas (warehouses, records, worker areas) due to fear of disclosure',
    advice: 'Ensure assessors have full, unrestricted access to all facilities, records, and workers without management interference or surveillance.',
    reminder: '🚨 CRITICAL: Any restriction on assessor access undermines the integrity of the assessment and indicates hidden compliance issues.'
  },
  '2.1.1.3': {
    commonProblems: 'Factories often delay document provision or claim documents are "being processed" to hide non-compliance',
    advice: 'Prepare all required documents in advance: payroll records, contracts, safety logs, medical records, training records. Organize by date.',
    reminder: '⚠️ Timely document provision is essential. Delays suggest either poor record-keeping (non-compliant) or deliberate concealment.'
  },
  '2.1.1.4': {
    commonProblems: 'Factories may have had previous assessments but learned nothing from findings; repeat issues persist',
    advice: 'Track all prior assessment visits. Document remediation efforts for each previous finding. Show evidence of corrective actions implemented.',
    reminder: '📊 Prior assessments reveal patterns. If same issues appear in multiple cycles, enforcement mechanisms may need strengthening.'
  },
  '2.1.1.5': {
    commonProblems: 'Factories may restrict assessor time or limit access to specific departments/shifts',
    advice: 'Allocate sufficient assessment time (typically 3-5 days minimum). Allow assessors to visit all shifts, all departments, with full worker access.',
    reminder: '⏱️ Adequate assessment time is needed to verify compliance across all operational areas.'
  },
  '2.1.1.6': {
    commonProblems: 'Factories may present only senior management; actual decision-makers may be absent; workers report different conditions than management states',
    advice: 'Ensure assessors interview people at all levels: HR, production managers, line supervisors, shop floor workers, union representatives.',
    reminder: '👥 Gap between management narrative and worker experience often reveals actual compliance problems.'
  },
  '2.1.1.7': {
    commonProblems: 'Factories may prevent worker access to assessors; workers may fear retaliation for honest answers; limited interview time',
    advice: 'Allow assessors private, unmonitored access to workers. Ensure workers understand they can speak freely without fear of repercussion.',
    reminder: '🤐 Workers often reveal non-compliance that management conceals. Genuine interviews require a safe, judgment-free environment.'
  },
  '2.1.1.8': {
    commonProblems: 'Management may downplay or deny known issues (wage deductions, overtime pressure, safety hazards) to avoid penalties',
    advice: 'Transparently report all known process integrity concerns. Provide evidence of any system weaknesses or trust issues.',
    reminder: '🔍 Process integrity directly affects the reliability of the entire assessment. Honesty here determines the credibility of all findings.'
  },
  '2.1.1.9': {
    commonProblems: 'Factories may only report issues specifically asked about; Building safety, environmental issues, and machinery hazards are often overlooked',
    advice: 'Conduct a comprehensive facility walk-through. Identify any safety hazards, environmental concerns, or issues affecting workers.',
    reminder: '⚠️ Worker voice is critical—listen to concerns about safety, health, and working conditions that fall outside the formal questions.'
  },

  // 2.2 Learning
  '2.2.1': {
    commonProblems: 'Factories skip worker/union consultation; decisions are top-down only; worker feedback is ignored',
    advice: 'Hold formal consultation meetings with elected worker representatives and union leaders before and after assessments.',
    reminder: '🤝 ILO Convention 144 requires genuine tripartite consultation. This is not optional—it is a legal requirement.'
  },

  // 2.3 Child Labour
  '2.3.1.1': {
    commonProblems: 'Factories may hire minors with false ID documents; age verification is superficial (no ID check, verbal claims only)',
    advice: 'Require official government-issued ID for all hires. Verify age through documentary evidence, not just worker claims.',
    reminder: '🚨 CRITICAL: Child labour is prohibited. Any worker under 15 is automatically a violation. Verify age strictly.'
  },
  '2.3.2.1': {
    commonProblems: 'Young workers (15-17) assigned to hazardous work: chemical exposure, heavy lifting, machinery operation without guards',
    advice: 'Prohibit workers under 18 from hazardous tasks. Provide written list of prohibited work. Train supervisors on age-appropriate assignments.',
    reminder: '⚠️ Hazardous work by minors is a worst form of child labour. Monitor all young workers for unsafe task assignments.'
  },
  '2.3.2.2': {
    commonProblems: 'Young workers work night shifts (10 PM - 6 AM) or excessive hours (>8 hours/day) including overtime',
    advice: 'Prohibit night work and overtime for all workers under 18. Limit daytime work to maximum 8 hours/day.',
    reminder: '🌙 Young workers need rest and education time. Night work and excessive hours harm physical/mental development.'
  },
  '2.3.2.3': {
    commonProblems: 'Workers are trafficked, bonded, forced, or coerced into work; debt bondage used to control workers',
    advice: 'Verify all workers entered employment voluntarily with signed contracts. Ensure workers can leave freely without financial penalty.',
    reminder: '🚨 CRITICAL: Forced labour/trafficking is a crime and a worst form of child labour. Zero tolerance policy required.'
  },
  '2.3.3.1': {
    commonProblems: 'Factories hire "contract workers" without age verification; birth certificates are forgeries or missing',
    advice: 'For all hired workers, obtain and verify government-issued ID. Keep copies on file. Cross-reference with national ID database if available.',
    reminder: '📋 Age verification at hiring is the first line of defense against child labour.'
  },

  // 2.4 Forced Labour
  '2.4.1.1': {
    commonProblems: 'Wages are artificially low or below minimum; workers cannot afford basic needs',
    advice: 'Pay at least the legal minimum wage plus legally mandated benefits (health insurance, severance, bonuses).',
    reminder: '💰 Subsistence wage is a baseline. Workers must earn enough to support themselves and families.'
  },
  '2.4.1.2': {
    commonProblems: 'Workers are threatened with wage loss, job termination, or police action if they refuse overtime or poor conditions',
    advice: 'Never threaten workers. Ensure all work is voluntary. Allow workers to refuse without penalty or consequences.',
    reminder: '⚠️ Coercion or threats = forced labour. Even verbal threats constitute legal violation.'
  },
  '2.4.1.3': {
    commonProblems: 'Workers are required to live on factory premises; movement is restricted; workers cannot leave without management permission',
    advice: 'Allow workers to live where they choose. Do not restrict movement or use housing as leverage for compliance.',
    reminder: '🚨 Restricting workers to factory compounds is forced confinement. This is illegal.'
  },
  '2.4.1.4': {
    commonProblems: 'Personal documents (IDs, passports) are held by management; workers cannot access their own documents',
    advice: 'Workers must retain possession of their personal documents at all times. Holding documents is illegal, even "for safekeeping".',
    reminder: '📄 Document confiscation = human trafficking indicator. Zero tolerance required.'
  },
  '2.4.1.5': {
    commonProblems: 'Wage deductions for tools, uniforms, damage, lateness, or "administrative fees" often exceed legal limits',
    advice: 'Deductions allowed only for court orders, taxes, and social insurance. Document all deductions and get worker signatures.',
    reminder: '⚠️ Excessive deductions reduce take-home pay below legal minimum. They must be transparent and limited by law.'
  },
  '2.4.1.6': {
    commonProblems: 'Workers are required to pay deposits, bribes, or "recruitment fees" to get or keep jobs',
    advice: 'Hiring must be free. No recruitment fees, deposits, or payments required from workers to obtain employment.',
    reminder: '💵 Worker-paid recruitment fees are illegal debt bondage. This creates forced labour conditions.'
  },

  // 2.5 Forced Labour & Fair Recruitment
  '2.5.1.1': {
    commonProblems: 'Job ads are deceptive about wages, hours, or conditions; workers arrive to find different job than promised',
    advice: 'Job postings must be truthful: accurate wage, hours, location, job duties, benefits clearly stated.',
    reminder: '🎯 Deceptive recruitment is human trafficking. Be explicit about all job conditions in advance.'
  },
  '2.5.1.2': {
    commonProblems: 'Recruitment agencies promise high wages but deliver low wages; workers trapped by debt to agencies',
    advice: 'Use only licensed, reputable recruitment agencies. Verify all promises in writing. Ensure contracts match promises.',
    reminder: '🤝 Verify recruitment agents are registered and bonded. Check worker complaints against agencies.'
  },

  // 2.6 Freedom of Association & Collective Bargaining
  '2.6.1.1': {
    commonProblems: 'Management uses company-controlled unions (yellow unions) to undermine independent worker organizing',
    advice: 'Allow independent, democratic unions. Do not organize company unions. Workers choose their own representatives freely.',
    reminder: '🗳️ CRITICAL: Union must represent worker interests, not management interests. Company-controlled unions violate ILO conventions.'
  },
  '2.6.2.1': {
    commonProblems: 'Workers who attempt to form unions face retaliation: harassment, demotion, termination, threats',
    advice: 'Protect workers' right to unionize. Do not retaliate. Ensure union organizers are not fired, demoted, or harassed.',
    reminder: '⚠️ CRITICAL: Retaliation for unionization violates ILO Convention 87. This is one of the most common compliance issues.'
  },
  '2.6.2.2': {
    commonProblems: 'Unions exist but management pressure prevents them from joining federations; federations prevented from affiliating with international unions',
    advice: 'Allow unions complete freedom to join federations and international organizations. Do not restrict union affiliations.',
    reminder: '🌍 Union freedom of association extends to federation membership. Management cannot control external union relationships.'
  },
  '2.6.3.1': {
    commonProblems: 'Management refuses to negotiate or engages in bad-faith negotiation; union negotiators are fired or transferred',
    advice: 'Engage in good-faith collective bargaining. Meet regularly with union leaders. Reach written CBA agreements.',
    reminder: '📝 CBA negotiation must be genuine. Poor attendance, rushing, or bad faith tactics undermine worker rights.'
  },
  '2.6.4.3': {
    commonProblems: 'Management appoints union leaders, sits in union meetings, controls union finances, or pressures union decisions',
    advice: 'Keep complete separation between management and union. Unions make independent decisions. Management does not attend union meetings.',
    reminder: '⚠️ CRITICAL: Management interference in union operations is illegal. Unions must be independent of management control.'
  },
  '2.6.4.4': {
    commonProblems: 'Union leaders given special treatment (overtime bonuses, promotions, higher pay) to co-opt them',
    advice: 'Treat union leaders like all other workers. Do not offer special benefits or privileges for union cooperation.',
    reminder: '💰 Offering incentives to union leaders corrupts union independence. This is illegal interference.'
  },
  '2.6.4.6': {
    commonProblems: 'Management uses divide-and-conquer tactics: creates multiple competing unions, demotes union leaders, transfers them to punish organizing',
    advice: 'Allow genuine union representation. Do not create competing unions to weaken worker power.',
    reminder: '⚠️ Manipulation of union structure to weaken worker voice is illegal. Support legitimate union organization.'
  },
  '2.6.4.7': {
    commonProblems: 'Union members are fired, demoted, denied benefits, or transferred to punish unionization',
    advice: 'Union membership must not affect job security, promotions, or benefits. Protect union members from retaliation.',
    reminder: '🚨 CRITICAL: Anti-union discrimination is one of the most serious violations. Enforce strict anti-retaliation policies.'
  },

  // 2.7 Compensation
  '2.7.1.1': {
    commonProblems: 'Wages are below minimum wage, or minimum wage not adjusted annually; workers cannot afford basic needs',
    advice: 'Pay 100% of legal minimum wage minimum. Adjust annually for inflation. Pay all legally mandated benefits on top of minimum.',
    reminder: '💰 Minimum wage is a baseline, not a target. Adjust proactively each year to keep pace with living costs.'
  },
  '2.7.1.2': {
    commonProblems: 'Wage structure is unclear; workers do not understand how bonuses, allowances, or deductions are calculated',
    advice: 'Provide written, clear wage structure to all workers. Itemize each payment component. Explain calculations openly.',
    reminder: '📊 Wage transparency is essential. Workers have right to understand how their pay is calculated.'
  },
  '2.7.1.3': {
    commonProblems: 'Wages below minimum for certain worker categories (women, migrants, temporary workers, disabled workers)',
    advice: 'All workers must receive 100% minimum wage regardless of category, gender, nationality, or employment type.',
    reminder: '⚖️ CRITICAL: Wage discrimination is illegal. Equal pay for equal work is non-negotiable.'
  },
  '2.7.1.4': {
    commonProblems: 'Piece-rate workers earn below minimum wage even working full-time; rate so low it is impossible to earn minimum',
    advice: 'Piece rates must be set so a normal worker can earn 100% minimum wage working regular hours. Monitor and adjust rates.',
    reminder: '📌 If piece-rate workers cannot earn minimum, the rate is too low. This is a wage theft mechanism.'
  },
  '2.7.2.1': {
    commonProblems: 'Overtime paid at regular rate instead of 150%; workers cannot work enough overtime to make minimum wage; overtime hours restricted',
    advice: 'Pay 150% of regular wage for overtime. Ensure workers can work needed overtime to earn livable income.',
    reminder: '⏰ Overtime must be properly compensated. Restricting overtime access is a wage theft mechanism.'
  },
  '2.7.2.2': {
    commonProblems: 'Night overtime (after 10 PM) paid at regular rate instead of 200%; night shift workers earn significantly less',
    advice: 'Pay 200% of regular wage for work after 10 PM (night work). This rate applies to all night shifts.',
    reminder: '🌙 Night work is more harmful to workers. Premium pay is legally required and morally essential.'
  },
  '2.7.3.1': {
    commonProblems: 'Workers not paid in full on paydays; some workers receive partial payment or IOUs; delays without compensation',
    advice: 'Pay 100% of wages on scheduled payday without fail. No partial payments or IOUs. On-time, full payment is non-negotiable.',
    reminder: '⚠️ Wage delays/shortfalls are wage theft. Late payment creates worker financial hardship.'
  },
  '2.7.3.2': {
    commonProblems: 'Workers must cash checks at company stores with inflated prices; workers forced to use company credit system',
    advice: 'Allow workers to cash pay at banks or through direct deposit. Do not control how workers spend wages.',
    reminder: '🏪 Truck system (company stores) is a wage control mechanism that leads to debt bondage.'
  },
  '2.7.3.3': {
    commonProblems: 'Wages paid in kind (goods, housing credit) instead of cash; wages paid irregularly or without agreed schedule',
    advice: 'Wages must be paid in cash at regular intervals (typically weekly or monthly). Payment must be reliable and on schedule.',
    reminder: '💵 Wage payment must be cash, predictable, and timely. In-kind payment limits worker freedom.'
  },
  '2.7.4.1': {
    commonProblems: 'Workers forced to buy uniforms, tools, or work materials from company at inflated prices; costs deducted from wages',
    advice: 'Provide work tools and uniforms free to workers. If workers choose personal items, pricing must be fair market rate.',
    reminder: '⚠️ Forcing workers to purchase items at markup is wage theft. Equipment costs are employer responsibility.'
  },
  '2.7.4.2': {
    commonProblems: 'Excessive deductions for breaks, bathroom time, medical visits, or "administrative fees" reduce take-home pay',
    advice: 'Limit deductions to: court orders, taxes, social insurance. Document and get written consent for all other deductions.',
    reminder: '📉 Deductions that reduce pay below minimum wage are illegal. Total deductions must not exceed 50% of gross wage.'
  },
  '2.7.4.3': {
    commonProblems: 'Workers charged for workplace accidents, damaged products, or absences; fines are arbitrary and excessive',
    advice: 'Workplace fines for misconduct must be: specified in writing, proportional, applied consistently, not reduce wage below minimum.',
    reminder: '⚠️ Arbitrary or excessive fines are wage theft. Fines must follow due process and clear rules.'
  },
  '2.7.5.1': {
    commonProblems: 'Social security contributions not paid to government; workers later discover they have no benefits, no pension, no insurance',
    advice: 'Pay all required social insurance contributions to government on time. Keep records. Provide workers with proof of contributions.',
    reminder: '📋 Unpaid social contributions = theft of worker future security. This is prosecutable.'
  },
  '2.7.5.2': {
    commonProblems: 'Workers not informed of health insurance coverage; coverage is inadequate or excludes work injuries',
    advice: 'Provide health insurance that covers workplace injuries, medical care, and emergencies. Inform workers of coverage details.',
    reminder: '🏥 Workplace injuries are employer responsibility. Insurance must cover work-related medical costs.'
  },

  // 2.8 Excessive Hours
  '2.8.1.1': {
    commonProblems: 'Regular work hours exceed legal limit (48 hours/week); workers cannot reduce hours even if they request',
    advice: 'Regular hours maximum 48/week. Allow workers to request hour reduction. Alternate high and low production periods.',
    reminder: '⏱️ Excessive regular hours reduce productivity and increase errors. Legal limits exist for worker health.'
  },
  '2.8.1.2': {
    commonProblems: 'Work schedule is unpredictable; workers do not know schedule in advance; last-minute schedule changes',
    advice: 'Post work schedule at least 1 week in advance. Allow workers to plan personal/family time. Minimize last-minute changes.',
    reminder: '📅 Unpredictable schedules harm worker family life and mental health. Advance notice is essential.'
  },
  '2.8.1.3': {
    commonProblems: 'Workers forced to work consecutive days without rest; no weekly rest day given',
    advice: 'Ensure every worker gets at least 1 full rest day per week (typically Sunday). No exceptions without legal requirement.',
    reminder: '😴 Rest days are health requirement. Working 7 days a week violates ILO standards and worker wellbeing.'
  },
  '2.8.2.1': {
    commonProblems: 'Overtime is mandatory regardless of personal circumstances; workers cannot refuse without penalty',
    advice: 'Overtime must be voluntary. Allow workers to decline without job loss or wage penalty. Rotate overtime fairly.',
    reminder: '⚠️ Forced overtime is illegal. Workers must have genuine choice to accept or refuse additional hours.'
  },
  '2.8.2.2': {
    commonProblems: 'Overtime hours are excessive and regular (more than 20 hours/week); becomes de facto regular requirement',
    advice: 'Overtime should be occasional. If overtime consistently exceeds 10 hours/week, hire additional staff instead.',
    reminder: '⏰ Excessive regular overtime indicates understaffing. Hire more workers rather than overworking existing staff.'
  },

  // 2.9 Occupational Safety and Health
  '2.9.1.1': {
    commonProblems: 'Safety policy exists only on paper; not communicated to workers; not enforced; no accountability',
    advice: 'Develop written safety policy. Communicate to all workers. Train supervisors to enforce consistently. Regular audits.',
    reminder: '📄 A safety policy means nothing if not implemented. Enforcement is critical.'
  },
  '2.9.2.1': {
    commonProblems: 'Workers not trained on machinery operation; trained once then never retrained; training in language workers do not understand',
    advice: 'Provide mandatory safety training before workers use machinery. Retrain annually. Use interpreters for non-Thai speakers.',
    reminder: '🎓 Training effectiveness depends on language comprehension. Verify understanding, not just attendance.'
  },
  '2.9.3.1': {
    commonProblems: 'Personal protective equipment (PPE) is not available; equipment is damaged/worn out; workers forced to pay for own PPE',
    advice: 'Provide all required PPE free. Ensure equipment fits and is properly maintained. Replace damaged items immediately.',
    reminder: '🥽 CRITICAL: PPE is non-negotiable. Lack of PPE is direct cause of serious injuries.'
  },
  '2.9.3.2': {
    commonProblems: 'Workers do not wear PPE because it is uncomfortable or slows production; supervisors allow non-compliance',
    advice: 'Make PPE use mandatory and enforced. Design comfortable equipment. Never prioritize speed over safety.',
    reminder: '⚠️ If workers avoid PPE, either equipment is designed poorly or safety culture is weak. Fix both.'
  },
  '2.9.4.1': {
    commonProblems: 'Machinery is not guarded or has broken guards; workers at risk of amputation or serious injury',
    advice: 'All machinery must have guards. Guards must be inspected monthly. Repair or replace broken guards immediately.',
    reminder: '🚨 CRITICAL: Unguarded machinery is the leading cause of permanent disability in factories. Zero tolerance.'
  },
  '2.9.5.1': {
    commonProblems: 'Workplace is not clean; chemicals stored unsafely; sharp objects on floor; trip hazards; unsanitary bathrooms',
    advice: 'Daily cleaning schedule. Proper chemical storage. Clear walkways. Sanitary facilities. Regular inspections.',
    reminder: '🧹 A clean workplace prevents accidents. Cleanliness is a hygiene and safety baseline.'
  },
  '2.9.6.1': {
    commonProblems: 'No first aid kits available; first aid responders not trained; injured workers taken to hospital in personal cars',
    advice: 'Stock multiple first aid kits on each floor. Train at least 2 workers per shift in first aid. Have protocol for emergencies.',
    reminder: '🚑 Fast first aid response saves lives. First aid training should be mandatory for supervisors.'
  },
  '2.9.7.1': {
    commonProblems: 'No noise level monitoring; workers in loud areas (50+ dB) without hearing protection; permanent hearing loss results',
    advice: 'Measure noise levels. Provide earplugs/earmuffs where needed. Rotate workers out of high-noise areas. Annual hearing tests.',
    reminder: '👂 Hearing damage is permanent and irreversible. Prevention is the only option.'
  },
  '2.9.8.1': {
    commonProblems: 'Chemical hazards not labeled; workers exposed without knowledge of danger; no MSDS sheets available',
    advice: 'Label all chemicals clearly. Provide MSDS (Material Safety Data Sheet) for every chemical. Train workers on hazards.',
    reminder: '☠️ Chemical exposure without knowledge is particularly dangerous. Workers must understand what they are exposed to.'
  },
  '2.9.9.1': {
    commonProblems: 'Emergency procedures not documented; workers do not know where to go in fire/emergency; no evacuation map',
    advice: 'Create written emergency procedures. Post evacuation maps. Train all workers quarterly. Conduct mock drills every 6 months.',
    reminder: '🚨 CRITICAL: Emergency preparedness saves lives. Regular drills ensure workers remember procedures under stress.'
  },
  '2.9.9.7': {
    commonProblems: 'Emergency exits are locked during work to control entry/exit; exit doors blocked by equipment; fire escape not maintained',
    advice: 'Emergency exits must NEVER be locked during work hours. Keep all escape routes clear. Verify exits daily.',
    reminder: '🔓 CRITICAL SAFETY: Locked exits can trap workers in fire. This is a life-threatening hazard and common violation.'
  },
  '2.9.9.8': {
    commonProblems: 'Escape routes blocked by boxes, equipment, or parked vehicles; poor lighting on stairs; clutter on fire escapes',
    advice: 'Clear minimum 1.5m width on all escape routes. Daily inspection. Remove any obstructions immediately.',
    reminder: '⚠️ Blocked escapes can prevent evacuation in seconds. Clear routes are absolute requirement.'
  },

  // 2.10 Working Time
  '2.10.1.1': {
    commonProblems: 'Regular work hours exceed legal maximum (48 hours/week); scheduling practices force overtime constantly',
    advice: 'Cap regular hours at 48/week maximum. Ensure weekly rest day(s). Schedule production to avoid mandatory overtime.',
    reminder: '⏱️ Consistent excessive hours indicate production planning failures. Hire more staff to maintain legal hours.'
  },
  '2.10.1.4': {
    commonProblems: 'Overtime is routine and unlimited; workers work 60+ hours/week regularly; no oversight of maximum hours',
    advice: 'Limit overtime to 2 hours/day, 10 hours/week maximum. Monitor and enforce caps strictly. Hire additional staff if needed.',
    reminder: '⚠️ Overtime beyond limits causes worker fatigue, reduced quality, and safety issues. Enforce limits strictly.'
  },
  '2.10.1.5': {
    commonProblems: 'Overtime is presented as mandatory; workers fear job loss if they refuse; subtle coercion in scheduling',
    advice: 'Communicate clearly: overtime is voluntary. Allow workers to decline without consequences. Schedule fairly and transparently.',
    reminder: '⚠️ Coerced overtime is forced labour. Ensure workers have genuine freedom to refuse.'
  },
  '2.10.2.1': {
    commonProblems: 'Weekly rest days are not given; workers work 7 days a week; rest days scheduled irregularly',
    advice: 'Ensure at least 1 full consecutive rest day per week (minimum 24 hours off). Regular, predictable schedule.',
    reminder: '😴 Rest days are health requirement. Workers need time for recovery, family, and personal needs.'
  },
  '2.10.3.1': {
    commonProblems: 'Workers not aware of annual leave entitlement; leave not approved; encouraged to work through vacation',
    advice: 'Communicate annual leave policy clearly. Allow workers to take all entitled leave. Do not discourage vacation use.',
    reminder: '🏖️ Annual leave is worker right, not employer discretion. Workers need rest and recovery time.'
  },
  '2.10.3.2': {
    commonProblems: 'Sick leave not provided or restricted; workers forced to work while ill; no sick pay or reduced pay during sick leave',
    advice: 'Provide sick leave with full pay. Not require doctor note for short absences. Never penalize workers for illness.',
    reminder: '🤒 Sick workers reduce productivity and spread illness. Paid sick leave benefits both workers and business.'
  },
  '2.10.4.1': {
    commonProblems: 'Breaks are not given or are too short; workers skip breaks to meet production quotas',
    advice: 'Provide mandatory breaks: 1 hour for lunch, 2-3 short breaks throughout day. Enforce breaks, never skip them.',
    reminder: '☕ Breaks improve productivity and prevent fatigue-related errors. Enforce, do not discourage.'
  },

  // 2.11+ Other Sections (add as needed)
};

module.exports = comprehensiveAdvice;
