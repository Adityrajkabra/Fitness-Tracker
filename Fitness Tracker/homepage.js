                                                                                                                                                                                   // script.js

// Elements
const goalForm = document.getElementById('goal-form');
const workoutForm = document.getElementById('workout-form');
const goalTypeInput = document.getElementById('goal-type');
const goalAmountInput = document.getElementById('goal-amount');
const workoutTypeInput = document.getElementById('workout-type');
const workoutDurationInput = document.getElementById('workout-duration');
const workoutRepsInput = document.getElementById('workout-reps');
const goalProgressDiv = document.getElementById('goal-progress');
const workoutLogList = document.getElementById('workout-log-list');

// Initialize data
let goal = null;
let workoutLog = [];

// Event Listeners
goalForm.addEventListener('submit', setGoal);
workoutForm.addEventListener('submit', logWorkout);

// Set Goal Function
function setGoal(e) {
    e.preventDefault();

    const goalType = goalTypeInput.value;
    const goalAmount = parseInt(goalAmountInput.value);

    // Validate input
    if (!goalAmount || goalAmount <= 0) {
        alert('Please enter a valid goal amount.');
        return;
    }

    goal = {
        type: goalType,
        amount: goalAmount,
        progress: 0,
    };

    // Clear form
    goalForm.reset();

    // Display goal
    displayGoalProgress();
}

// Log Workout Function
function logWorkout(e) {
    e.preventDefault();

    const workoutType = workoutTypeInput.value;
    const workoutDuration = parseInt(workoutDurationInput.value);
    const workoutReps = parseInt(workoutRepsInput.value) || 0;

    // Validate input
    if (!workoutDuration || workoutDuration <= 0) {
        alert('Please enter a valid workout duration.');
        return;
    }

    // Log workout
    const workoutEntry = {
        type: workoutType,
        duration: workoutDuration,
        reps: workoutReps,
    };

    workoutLog.push(workoutEntry);

    // Update goal progress
    if (goal && goal.type === 'workout-duration') {
        goal.progress += workoutDuration;
    } else if (goal && goal.type === 'workout-reps') {
        goal.progress += workoutReps;
    }

    // Clear form
    workoutForm.reset();

    // Display progress and log
    displayGoalProgress();
    displayWorkoutLog();
}

// Display Goal Progress
function displayGoalProgress() {
    if (goal) {
        const progressPercentage = Math.min((goal.progress / goal.amount) * 100, 100);
        goalProgressDiv.innerHTML = `
            <h3>Goal Progress</h3>
            <p>${goal.progress} / ${goal.amount} ${goal.type === 'workout-duration' ? 'minutes' : 'reps'} completed.</p>
            <div style="width: 100%; background-color: #f3f3f3; border-radius: 10px;">
                <div style="width: ${progressPercentage}%; background-color: #4CAF50; height: 20px; border-radius: 10px;"></div>
            </div>
        `;
    }
}

// Display Workout Log
function displayWorkoutLog() {
    workoutLogList.innerHTML = '';
    workoutLog.forEach((entry, index) => {
        const workoutEntryDiv = document.createElement('div');
        workoutEntryDiv.classList.add('workout-entry');
        workoutEntryDiv.innerHTML = `
            <p><strong>Workout ${index + 1}:</strong></p>
            <p>Type: ${entry.type}</p>
            <p>Duration: ${entry.duration} minutes</p>
            <p>Reps: ${entry.reps}</p>
        `;
        workoutLogList.appendChild(workoutEntryDiv);
    });
}