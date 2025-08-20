import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { SeafarersService } from '../../core/services/seafarers/seafarers.service';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { Seafarers } from '../../shared/seafarers';
import { Iemployee } from '../../shared/iemployee';
import { Ivendor } from '../../shared/ivendor';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/search.pipe';

@Component({
  selector: 'app-seafarers',
  imports: [
    CommonModule,
    FormsModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    NavbarComponent,
    SearchPipe,
  ],
  templateUrl: './seafarers.component.html',
  styleUrl: './seafarers.component.css',
})
export class SeafarersComponent implements OnInit {
  columns = [
    { key: 'Id', label: 'Emp ID', checked: true },
    { key: 'NameOfSpouse', label: 'Name', checked: true },
    { key: 'Nationality', label: 'Nationality', checked: true },
    { key: 'BirthDate', label: 'Date of Birth', checked: true },
    { key: 'JobName', label: 'Job Name', checked: true },
    { key: 'SponsorName', label: 'Sponsor Name', checked: true },
    { key: 'EmployeeName', label: 'Employee Name', checked: true },
    { key: 'EmployeeCode', label: 'Employee Code', checked: true },
    { key: 'InsuranceDate', label: 'Insurance Data', checked: true },
    { key: 'EmploymentDate', label: 'Employment Data', checked: true },
    { key: 'PassPortIssueDate', label: 'PassPort Issue Date', checked: true },
    { key: 'VisaIssueDate', label: 'Visa Issue Date', checked: true },
    { key: 'VisaExpiryDate', label: 'Visa Expiry Date', checked: true },
    { key: 'Mobile', label: 'Mobile Number', checked: true },
    { key: 'NationalId', label: 'National Id', checked: true },
    { key: 'Email', label: 'Email', checked: true },
    { key: 'Age', label: 'Age', checked: true },
    { key: 'PassportNumber', label: 'Passport Number', checked: true },
    { key: 'PassportExpireDate', label: 'Passport Expiry Date', checked: true },
    { key: 'Actions', label: 'Actions', checked: true },
  ];
  form!: FormGroup;
  activeIndex = 0;
  searchQuery: string = '';
  showInput = false;
  toggleInput() {
    this.showInput = !this.showInput;
  }
  setActive(index: number) {
    this.activeIndex = index;
  }

  constructor(private fb: FormBuilder) {}
  allSeafarers: WritableSignal<Seafarers[]> = signal([]);
  allEmployees: WritableSignal<Iemployee[]> = signal([]);
  allVedors: WritableSignal<Ivendor[]> = signal([]);
  private readonly seafarersService = inject(SeafarersService);
  private readonly toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getSeafarers();
    this.fillEmployee();
    this.fillVendor();

    this.form = this.fb.group({
      entity: this.fb.group({
        Nationality: [''],
        PassPortIssueDate: [''],
        PassportExpiryDate: [''],
        IDExPiryDate: [''],
        SeamanBookNO: [''],
        Remarks: [''],
        DateofBirth: [''],
        Email: [''],
        Age: [{ value: '', disabled: true }],
        PlaceofBirth: [''],
        Religion: [''],
        MaritalStatus: [''],
        Rank: [''],
        EmpId: [null],
        VisaSponsorId: [null],
        VisaIssueDate: [''],
        VisaExpiryDate: [''],
        NameOfSpouse: [''],
        DateofHire: [''],
        PassportNumber: [''],
        NoOfChildren: [0],
        BodyWeight: [null],
        Height: [null],
        VisaUAEIdNO: [''],
        NearestAirport: [''],
        ResidenceNumber: [''],
        SkypeID: [''],
        PermanentAddressHomeCountry: [''],
        ContactNumberHomeCountry: [''],
        ContactNameAndNumberDuringEmergenciesUAE: [''],
        ContactNameAndNumberDuringEmergenciesHome: [''],
        SeamanIssueDate: [''],
        SeamanExpiryDate: [''],
        CicpaNO: [''],
        CicpaIssueDate: [''],
        CicpaExpiryDate: [''],
        Declaration: [''],
        SignedOffFromAShipDueToMedicalReason: [false],
        SignedOffFromAShipDueToMedicalReasonComment: [''],
        UndergoneAnyMdicalOperation: [false],
        UndergoneAnyMdicalOperationComment: [''],
        DoctorConsultation: [false],
        DoctorConsultationComment: [''],
        HealthOrDisabilityProblem: [false],
        HealthOrDisabilityProblemComment: [''],
        InquiryOrInvolvedMaritimeAccident: [false],
        InquiryOrInvolvedMaritimeAccidentComment: [''],
        LicenseSuspendedOrRevoked: [false],
        LicenseSuspendedOrRevokedComment: [''],
      }),

      Qualifications: this.fb.array([]),
      qualificationInput: this.fb.group({
        DegreeOrCourse: [''],
        CourseIssueDate: [''],
        MajorOrSubject: [''],
        University: [''],
        Country: [''],
        Type: [1],
      }),
      Certificates: this.fb.array([]),
      certificatesInput: this.fb.group({
        Capacity: [''],
        Regulation: [''],
        IssueDate: [''],
        ExpiryDate: [''],
        IssuingAuthority: [''],
        Limitations: [''],
        Country: [''],
        Type: [1],
      }),

      Languages: this.fb.array([]),
      References: this.fb.array([]),
      WorkExperiences: this.fb.array([]),
    });
    this.form.get('entity.DateofBirth')?.valueChanges.subscribe((dob) => {
      if (dob) {
        const age = this.calculateAge(dob);
        this.form.get('entity.Age')?.setValue(age);
      } else {
        this.form.get('entity.Age')?.setValue('');
      }
    });
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  getSeafarers(): void {
    this.seafarersService.getAllSeafarers().subscribe({
      next: (res) => {
        this.allSeafarers.set(res.Data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fillEmployee(): void {
    this.seafarersService.fillEmployee().subscribe({
      next: (res) => {
        this.allEmployees.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fillVendor(): void {
    this.seafarersService.fillVendor().subscribe({
      next: (res) => {
        this.allVedors.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toggleActive(seafarer: any) {
    const newStatus = seafarer.Status === 1 ? 2 : 1;
    const empId = 26;

    this.seafarersService
      .activateAndInActivateSeafarer(seafarer.Id, newStatus, empId)
      .subscribe({
        next: (res) => {
          seafarer.Status = newStatus;
          this.getSeafarers();
        },
        error: (err) => console.error('Error changing status', err),
      });
  }
  // Create methods to add new entries to the form arrays

  addLanguage() {
    this.languages.push(
      this.fb.group({
        Language: [''],
        Read: [''],
        Write: [''],
        Speak: [''],
      })
    );
  }
  removeLanguage(index: number) {
    this.languages.removeAt(index);
  }
  addReference() {
    this.references.push(
      this.fb.group({
        Name: [''],
        Company: [''],
        ContactInfo: [''],
      })
    );
  }
  removeReference(index: number) {
    this.references.removeAt(index);
  }
  addWorkExperience() {
    this.workExperiences.push(
      this.fb.group({
        Course: [''],
        Institute: [''],
        IssueDate: [''],
        ExpiryDate: [''],
      })
    );
  }
  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }
  //getters for the form arrays
  get qualifications(): FormArray {
    return this.form.get('Qualifications') as FormArray;
  }
  get qualificationInput(): FormGroup {
    return this.form.get('qualificationInput') as FormGroup;
  }
  get certificates(): FormArray {
    return this.form.get('Certificates') as FormArray;
  }
  get certificatesInput(): FormGroup {
    return this.form.get('certificatesInput') as FormGroup;
  }
  // Create methods to add new object and remove to the form arrays
  addQualification() {
    const newQual = this.fb.group({
      DegreeOrCourse: [this.qualificationInput.get('DegreeOrCourse')?.value],
      MajorOrSubject: [this.qualificationInput.get('MajorOrSubject')?.value],
      CourseIssueDate: [this.qualificationInput.get('CourseIssueDate')?.value],
      University: [this.qualificationInput.get('University')?.value],
      Country: [this.qualificationInput.get('Country')?.value],
    });

    this.qualifications.push(newQual);

    // نفضي الـ input form
    this.qualificationInput.reset();
  }
  removeQualification(index: number) {
    this.qualifications.removeAt(index);
  }
  addcertificates() {
    const newCert = this.fb.group({
      Capacity: [this.certificatesInput.get('Capacity')?.value],
      Regulation: [this.certificatesInput.get('Regulation')?.value],
      IssueDate: [this.certificatesInput.get('IssueDate')?.value],
      ExpiryDate: [this.certificatesInput.get('ExpiryDate')?.value],
      IssuingAuthority: [this.certificatesInput.get('IssuingAuthority')?.value],
      Limitations: [this.certificatesInput.get('Limitations')?.value],
      Country: [this.certificatesInput.get('Country')?.value],
    });

    this.certificates.push(newCert);

    this.certificatesInput.reset();
  }
  removecertificates(index: number) {
    this.certificates.removeAt(index);
  }

  get languages(): FormArray {
    return this.form.get('Languages') as FormArray;
  }

  get references(): FormArray {
    return this.form.get('References') as FormArray;
  }

  get workExperiences(): FormArray {
    return this.form.get('WorkExperiences') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;
      this.seafarersService.saveSeafarer(payload).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success('Saved Successfully', 'Congratulations', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
        },
        error: (err) => console.error(err),
      });
    }
  }
}
