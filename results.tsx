import { useEffect, useState } from 'react';
import { Patient, columns } from './columns';
import { DataTable } from './data-table';

enum Quality {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

// The numbering represents the order the events are expected to occur,
// First is the baseline, then the follow-up, and finally the conclusion.
// All event's may not be present, but when they are, the earlier event will always be present.
enum Event {
  Baseline = 'Baseline',
  FollowUp = 'FollowUp',
  Conclusion = 'Conclusion',
}

interface Result {
  patientId: string; // the client specific identifier
  scannedAt: Date; // the time at which the sample was digitally scanned
  score: number; // the score of the sample
  event: Event; // the event that the sample was taken at
  sampleQuality: Quality; // the quality of the sample
  dateOfBirth: string; // the date of birth of the patient
}

// please do not edit the data, unless to add further examples
const data: Result[] = [
  {
    patientId: '87gd2',
    scannedAt: new Date('2021-08-03T12:00:00Z'),
    score: 0.81,
    event: Event.FollowUp,
    sampleQuality: Quality.Low,
    dateOfBirth: '1990-01-01',
  },
  {
    patientId: '87gd2',
    scannedAt: new Date('2021-08-01T12:00:00Z'),
    score: 0.92,
    event: Event.Baseline,
    sampleQuality: Quality.High,
    dateOfBirth: '1990-01-01',
  },
  {
    patientId: '87gd2',
    scannedAt: new Date('2021-08-08T12:00:00Z'),
    score: 0.43,
    event: Event.Conclusion,
    sampleQuality: Quality.Low,
    dateOfBirth: '1990-01-01',
  },
  {
    patientId: 'js27h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js28h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js29h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js30h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js31h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js32h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js33h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js34h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: 'js35h',
    scannedAt: new Date('2021-08-02T12:00:00Z'),
    score: 0.74,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1993-02-12',
  },
  {
    patientId: '9782e',
    scannedAt: new Date('2021-08-03T12:00:00Z'),
    score: 0.25,
    event: Event.Baseline,
    sampleQuality: Quality.Medium,
    dateOfBirth: '1981-04-12',
  },
  {
    patientId: '9782e',
    scannedAt: new Date('2021-08-21T12:00:00Z'),
    score: 0.21,
    event: Event.FollowUp,
    sampleQuality: Quality.High,
    dateOfBirth: '1981-04-12',
  },
];

function transformData(data: Result[]): Patient[] {
  const patientMap: { [key: string]: Partial<Patient> } = {};

  data.forEach((result) => {
    if (!patientMap[result.patientId]) {
      patientMap[result.patientId] = {
        patientId: result.patientId,
        scannedAt: result.scannedAt.toDateString(),
        baseline: 0,
        followUp: 0,
        conclusion: 0,
        dateOfBirth: result.dateOfBirth,
      };
    }

    switch (result.event) {
      case Event.Baseline:
        patientMap[result.patientId]!.baseline = result.score;
        patientMap[result.patientId]!.baselineQuality = result.sampleQuality;
        break;
      case Event.FollowUp:
        patientMap[result.patientId]!.followUp = result.score;
        patientMap[result.patientId]!.followUpQuality = result.sampleQuality;
        break;
      case Event.Conclusion:
        patientMap[result.patientId]!.conclusion = result.score;
        patientMap[result.patientId]!.conclusionQuality = result.sampleQuality;
        break;
    }
  });

  return Object.values(patientMap).map((patient) => ({
    patientId: patient.patientId as string,
    scannedAt: patient.scannedAt as string,
    baseline: patient.baseline || 0,
    followUp: patient.followUp || 0,
    conclusion: patient.conclusion || 0,
    dateOfBirth: patient.dateOfBirth as string,
    baselineQuality: patient.baselineQuality,
    followUpQuality: patient.followUpQuality,
    conclusionQuality: patient.conclusionQuality,
  }));
}

export default function Results() {
  const [transformedData, setTransformedData] = useState<Patient[]>([]);

  useEffect(() => {
    const transformedData = transformData(data);
    setTransformedData(transformedData);
  }, []);

  return (
    <div className="container mx-auto py-10 min-w-[500px] max-w-[800px]">
      <h1 className="mb-6 text-3xl font-bold">Patient Results</h1>
      <DataTable columns={columns} data={transformedData} />
    </div>
  );
}
