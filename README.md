# GTL Result Viewer

This is a demo app showing results produced by GTL.
As it is it just prints out data.

Please make it more consumable for the viewer.

## How to run

Install dependencies:

```bash
npm install
```

run the dev app:

```bash
npm run dev
```

## Design Language

We're interested in well communicated information with a modern look and feel.
How you approach is up to you, we use [shadcn](https://ui.shadcn.com/) and reference [geist](https://vercel.com/geist) as a design system, we're happy for you to do the same.

## Codebase

The repo contains a lot of the boilerplate used for a React Typescript project, we expect for this task you'll only need to edit `src/Results.tsx` and `src/Results.css`. You're welcome to add files. You're welcome to use any libraries you like, however, you do not need to be considerate of scaling this project up.

Tests for this project are not a requirement, but if you feel like it, go ahead.

## Task

You're tasked with updating the Results component to better present the data.

This task is largely focussed on understanding appropriate layout and hierachy for the data provided, here is some further information to guide your approach.

The data is a list of Result[] as defined in the Results.tsx file, comments for each field are provided in the file.

The user will expect to see all results on one scrollable page. Their primary use case for this page is to, at a glance, see the difference in a patient's `score` between each `event` to understand how the patient is progressing.

They would then likely seek to understand the `scannedAt` date (not time) for each event in that patient's journey as well as the `sampleQuality` of the sample to contextualise the scores.

They then would possibly copy the `patientId` to check further in another application.

Alongside the above description please consider the following

### Requirements

- The score for each event should be shown
- Do not display PHI, the patientId is not PHI
- The user is only interested in the date part of the event DateTime.
- Each event should include an indicator of the sample quality.
- The Results component should be responsive between a width of 500px and 800px, you can consider vertical scroll is always available.
- Please assume the user is on a desktop viewing in a landscape aspect ratio

### Assumptions

- The patient ID is unique to each patient.
- Event DateTime will never be the same day for the same patient.
- There will only ever be 3 events for a patient and they will be unique per event type.
- The user understands the concept of a patient's journey and what each event means
- The user understands the concept of a score, what the score means and that this page is primarily for showing scores.
- The user might be colour blind
- The score will always be between 0 and 1 inclusive, and will be maximum 2dp.
- The user is on a desktop viewing in a landscape aspect ratio
- The results component would be the main part of a page but would be used in a page with a header and left-side menu.

## Data Background

Imagine the following happens to lead to the data being available.

One of our users has set up an experiment with three consecutive events, a "Baseline", "FollowUp", and "Conclusion".
They enrol 3 patients.
For each event, the user will scan a tissue sample from the patient and send to us, they'll provide the image, the patientId and the timestamp of when they scanned, they'll also provide which event it was.
On receiving the sample image, we run our algorithms and produce a score and an indicator of sample quality and then store all of the information together in our database.
When the user opens the results page our app fetches the data from our internal API.
