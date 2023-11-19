import ProgressBar from 'progress';

// Total number of iterations
const totalIterations = 100;

// Create a new progress bar with a format
const bar = new ProgressBar(':bar :percent', {
  total: totalIterations,
});

// Update the progress bar at intervals
export const updateProgress = () => {
  let currentIteration = 0;

  const interval = setInterval(() => {
    currentIteration++;

    // Update the progress bar
    bar.tick();

    // Stop the interval when all iterations are complete
    if (currentIteration === totalIterations) {
      clearInterval(interval);
      console.log('\nProgress complete!');
    }
  }, 25); // Interval time in milliseconds (you can adjust this as needed)
};