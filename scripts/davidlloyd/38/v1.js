// Your HTML content to inject
const html = `
<div class="ccx-bt-container">
  <h3>What to expect</h3>
  <p>Explore the club at your pace. Tours usually take around 30 minutes, but we’ll tailor it to suit your schedule.</p>
  <p>You’ll meet one of our friendly team members to chat about what you’re looking for, see our facilities up close, and get personalised recommendations on the best membership for you.</p>
  <p>You can even join on the spot and start enjoying everything the club has to offer.</p>
  <div></div>
  <h3>Who can come along?</h3>
  <p>We offer memberships for individuals, couples, and families, though you can bring whoever you like to the tour.</p>
</div>
`;

// Async function to run the experiment logic
async function runAmplitudeExperiment() {
  // Assuming the Experiment client is exposed globally as window.experiment
  // If initialized differently (e.g., window.Experiment), adjust accordingly.
  const experiment = window.experiment;

  if (!experiment) {
    console.warn('Amplitude Experiment SDK not found.');
    return;
  }

  // Fetch variants for the user (automatic exposure)
  // Use current Amplitude user context if integrated; otherwise anonymous
  await experiment.fetch();

  // Get the variant value
  const variant = experiment.variant('38-v1'); // Replace with your exact flag key

  if (variant === 'treatment') { // Adjust variant value string as per your setup (e.g., 'on', 'variation-1')
    // MutationObserver to mimic observeSelector
    const observer = new MutationObserver((mutations, obs) => {
      const ref = document.querySelector('.css-1azpm5q');
      if (ref && !document.querySelector('.ccx-bt-container')) {
        ref.insertAdjacentHTML('beforebegin', html);
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Immediate check
    const immediateRef = document.querySelector('.css-1azpm5q');
    if (immediateRef && !document.querySelector('.ccx-bt-container')) {
      immediateRef.insertAdjacentHTML('beforebegin', html);
    }
  }
}

// Execute on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAmplitudeExperiment);
} else {
  runAmplitudeExperiment();
}