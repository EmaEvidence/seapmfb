import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Paragraph} from '../../common/Text';
import AdvanceLoan from '../../assets/images/advanceLoan.png';
import PayrollLoan from '../../assets/images/payrollLoan.png';
import GroupLoan from '../../assets/images/groupLoan.png';
import SmallLoan from '../../assets/images/smallLoan.png';
import PaydayLoan from '../../assets/images/paydayLoan.png';
import CoopLoan from '../../assets/images/coopLoan.png';
import styles from './Loans.styles';
import {Button, Header} from '../../common';
import {LoanWrapper} from './Loans';

// move this to a file in the repo and fetch it into the app to prevent version change when ever this is edited.
const loanTypes = [
  {
    name: 'Salary Advance',
    logo: AdvanceLoan,
    requirements: [
      'Loan amount antitlement is 1/3 of the Net Monthly salary of the Applicant (As stipulated in his/her Employment letter).',
      'Interest rate of 4% Monthly',
      'Account Opening Documentation of 3 Recent Passports, Photocopy Of Nepa Bill, Photocopy of any means of I.D Card.',
      'Introduction letter from the company of the beneficiary.',
      "Two co-staff Guarantors with work and Valid I.D Card + One recent passport with detailed description of the guarantors' houses and offices.",
      '3 months statement of account of the beneficiary',
      'Bureau search of minimum of #1,000',
      'Loan form of 0.5% of the loan amount',
    ],
    repayment: [
      'Repayment tenor of 6 month, which will be deducted from the beneficiary’s salary on a monthly basis.',
      'Default fine of 10% of the repayment amount (Non- Negotiable)',
    ],
    howToApply: [
      'Visit any of our Branches to obtain a loan form or download the form online.',
      'Have the filled form scan to customerservice@seapmfb.com',
      'Visit our branch for identification and verification if you downloaded the loan form online',
    ],
    description:
      "This loan module is mostly suitable for Salary Earners. It's a monthly Loan Plan in which loan gets deducted from the customers'accounts as soon as their salaries get paid.",
  },
  {
    name: 'Group Loan',
    logo: GroupLoan,
    requirements: [
      'Loan amount entitlement between #20,000 - #50,000 as the case maybe.',
      'Interest rate of 4% Monthly',
      'Account opening of group savings account with Account Opening Documentation, 2 Recent Passports, Photocopy Of NEPA Bill, Photocopy of any means of I.D Card of all executives and signatories to the group account, group stamp, application letter to open an account, minutes of the meeting and bye law.',
      'Group savings account to be opened with #5,000, individual savings account opening with #1,000. 4 passport photographs for each member of the group (two passports for account opening), 1 passport for loan form and 1 passport for passbook.',
      'Loan form of 0.5% of the loan amount',
      '3 months statement of account of the beneficiary',
      'Bureau search of minimum of #1,000',
      'Loan form of 0.5% of the loan amount',
      'Equity contribution of 10% of the loan amount',
      'Group meeting must be attended for 2 weeks before disbursement',
      'Compulsory savings is 1% and above of the loan value',
      'Equity contribution of 10% of the loan amount',
      'Two Guarantors with Valid I.D Card and one recent passport with detailed description of the guarantor’s house and shop of the leader, where one stands for the whole group and one guarantor for other members of the group each.',
      'Original Receipted & Valuable House Hold Gadgets: e.g. Television Set, Generator, Refrigerator, Machine Or Motorcycle of the borrower and the guarantors.',
    ],
    repayment: [
      'Group repayment of the loan.',
      'Repayment tenor of 6 month',
      'Repayment plan on weekly basis for 26 weeks',
      'Default fine of 10% of the repayment amount (Non- Negotiable)',
    ],
    howToApply: [
      'Visit any of our Branches to obtain a loan form or download the form online.',
      'Have the filled form scan to customerservice@seapmfb.com',
      'Visit our branch for identification and verification if you downloaded the loan form online',
    ],
    description:
      'This loan module is suitable for group of professionals, Artisans, organization or a body. Read more to view the requirements of this loan product.',
  },
  {
    name: 'Micro Loan',
    logo: SmallLoan,
    requirements: [
      'Loan amount entitlement between #101,000 - #500,000.',
      'Loan form of 0.5% of the loan amount',
      'Bureau search of minimum of #1,000',
      'Interest rate of 4.5% monthly',
      'Compulsory savings is 1% and above of the loan value',
      'Equity contribution of 10% of the loan amount.',
      'No moratorium included',
      'Two Guarantors with Valid I.D Card and one recent passport with detailed description of the guarantor’s house and shop.',
      'The guarantors must be a civil/business owner.',
      'The civil servant will present 3 updated cheques with 3 months statement of account.',
      'Presentation of collateral by the borrower i.e. unexpired complete vehicle documents or landed property with survey plan and land agreement.',
      'Presentation of the pictures of the collateral presented.',
      'Passport and means of I.D card of the beneficiary',
      'The borrower must have a shop or business place as the major collateral and main criteria for accessing the loan.',
      'Presentation of the spouse passport and means of I.D card as next of kin.',
      'Transfer of collateral ownership to Seap Mfb',
      'Affidavit to be sworn on the collateral, loanee passport must be affixed on the affidavit',
      "Loanee's house/shop pre disbursement slip to be completed.",
      'Letter of undertaking to be completed by the guarantors and the account officer.',
      'Inspection to the borrower and the guarantors place.',
    ],
    repayment: [
      'Repayment tenor of 6 month',
      'Repayment plan on weekly basis for 26 weeks/monthly basis for 6 months.',
      'Default fine of 10% of the repayment amount (Non- Negotiable)',
    ],
    howToApply: [
      'Visit any of our Branches to obtain a loan form or download the form online.',
      'Have the filled form scan to customerservice@seapmfb.com',
      'Visit our branch for identification and verification if you downloaded the loan form online',
    ],
    description:
      'Explore micro loan product. Expand and grow your business with micro loan at a low and stress free interest rate.',
  },
  {
    name: 'Payroll Loan',
    logo: PayrollLoan,
    requirements: [
      'Loan amount range from #50,000 - #1,000,0000.',
      'Simple account opening and simple documentation.',
      'Zero gurantorship and quick turnaround time (TAT).',
      '3 months statement of account.',
      'Payslip of the applicant where possible.',
      'IPPIS number is required.',
      'Interest rate 4% flat.',
      'No management fees.',
      'No processing fee.',
      'No equity contribution.',
      'Automation Deduction from the source through Remittal.',
      'No account opening fee.',
      'Employment letter.',
      'Confirmation letter.',
    ],
    repayment: [
      'Duration of the facility from 6 months to 12 months.',
      'Payslip of the applicant where possible.',
    ],
    howToApply: [
      'Visit any of our Branches to obtain a loan form or download the form online.',
      'Have the filled form scan to customerservice@seapmfb.com',
      'Visit our branch for identification and verification if you downloaded the loan form online',
    ],
    description:
      'A Loan product for Federal/State Government workers whose salaries are being paid through Integrated Personnel and Payroll Information System (IPPIS).',
  },
  {
    name: 'Payday Loan',
    logo: PaydayLoan,
    requirements: [
      'Facility range from 50,000 to 3,000,000 depending on the salary.',
      'Loan amount entitlement is 1/3 of the net monthly salary.',
      'Saving and Current account required.',
      'Applicant cheques required.',
      'Work ID and other valid means of identification.',
      '3 months statement of account of the beneficiary.',
      '2 solid guarantors. They must be work colleagues with the beneficiary, and must provide valid ID cards and cheques.',
      'Repayment through Direct Debit Mandate (DDM) or cheques.',
      'Interest rate of 4% monthly.',
    ],
    repayment: ['Repayment frequency: Monthly', 'Duration: 6 months.'],
    howToApply: [
      'Visit any of our Branches to obtain a loan form or download the form online.',
      'Have the filled form scan to customerservice@seapmfb.com',
      'Visit our branch for identification and verification if you downloaded the loan form online',
    ],
    description:
      'Payday loan is strictly for salary earners in both private and public organizations. The organization must be reputable and not on IPPIS.',
  },
  {
    name: 'Cooperative Societies Loan',
    logo: CoopLoan,
    requirements: [
      'Account opening of corporate savings and corporate current account with opening fund of #5,000 and #10,000 respectively.',
      'Account Opening Documentation of 6 Recent Passports, Photocopy Of IBEDC Bill, Photocopy of any means of I.D Card, photocopy of registered certificate and other document of CAC, application letter to open an account and board of resolution.',
      'Loan amount entitlement between #1,000,000 - #5,000,000.',
      'Loan form of 0.5% of the loan amount.',
      'Bureau search of minimum of #1,000 (each conductible on all the corporative executives).',
      'Interest rate of 4%(negotiable) monthly.',
      'Equity contribution of 10% of the loan amount.',
      'Compulsory savings is 10% and above of the loan value.',
      'No moratorium inclusive.',
      'Two or Three Guarantors with Valid I.D Card and one recent passport with detailed description of the guarantors’ house and shop.',
      'The guarantors must be two civil servant with the presentation of their work I.Ds and letter of employment, or a business person with a collateral to present.',
      'The civil servant will present 3 undated cheques with 3 month statement of account.',
      'Presentation of collateral by the executive members, and property of the society i.e. unexpired complete vehicle documents or landed property with survey plan and land agreement.',
      'Presentation of the pictures of the collateral presented',
      'Passports and means of I.Ds of the executive members.',
      'Transfer of collateral ownership to SEAP Mfb',
      "Affidavit to be sworn on the collateral, loanee's passport must be affixed on the affidavit",
      'Letter of undertaking to be completed by the guarantors and the account officer.',
      'The guarantors and the executives are to fill the guarantors indemnity form.',
      'Landed document search with #2,500.',
      'Inspection to the executives’ houses, society meeting house and the guarantors’ place.',
    ],
    repayment: [
      'Repayment tenor of 12 month',
      'Repayment plan on monthly basis for 12 months',
      'Default fine of 10% of the repayment amount (Non- Negotiable)',
    ],
    howToApply: [
      'Visit any of our Branches to obtain a loan form or download the form online.',
      'Have the filled form scan to customerservice@seapmfb.com',
      'Visit our branch for identification and verification if you downloaded the loan form online',
    ],
    description: 'This loan module is designed for cooperative societies.',
  },
];

export const LoanTypes = ({navigation}: any) => {
  return (
    <LoanWrapper>
      <View style={styles.wrapper}>
        <Header
          showBackBtn
          overrideGoBack={() => navigation.goBack()}
          title={'Loans'}
          navigation={navigation}
        />
        <ScrollView contentContainerStyle={styles.loanWrapper}>
          {loanTypes.map(item => (
            <TouchableOpacity
              style={styles.loanCard}
              key={item.name}
              onPress={() =>
                navigation.navigate('LoanDetails', {
                  state: {
                    loan: item,
                  },
                })
              }>
              <Image source={item.logo} style={styles.logo} />
              <View style={styles.loanCardTitle}>
                <Paragraph text={item.name} overrideStyle={styles.cardLabel} />
              </View>
            </TouchableOpacity>
          ))}
          <Button
            label="Apply for a Loan"
            onPress={() => navigation.navigate('LoanForm')}
            overrideStyle={styles.btn}
          />
        </ScrollView>
      </View>
    </LoanWrapper>
  );
};

export default LoanTypes;
