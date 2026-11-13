Not much goes on in Robot.java compared to [[RobotContainer.java]]

However, there is still some important stuff to be done in this file. 

There are a few built in functions we call to add commands to robot initialization or autonomous periodic. 

There are 5 main robot states we can override.
- Robot
- Teleoperated
- Autonomous
- Disabled
- Simulation

Each of these modes have their own initialization and periodic function. 

**Initialization functions** are called once the robot enters a certain state. These are useful for commands which need to be called once, like scheduling the autonomous command once the robot enters autonomous modes. 

**Periodic functions** are called once per scheduler run (while the robot is in a certain state). These are useful for commands which need to be run continuously such as updating values in a dashboard. 

- *Initialization and Periodic functions can also be made for each subsystem. 

Below is an example of a periodic function running continuously while the robot is on which puts diagnostic values into SmartDashboard.

```Ex:
/**
* This function is called every 20 ms, no matter the mode. Use this for items like diagnostics
* that you want ran during disabled, autonomous, teleoperated and test.
*
* <p>This runs after the mode specific periodic functions, but before LiveWindow and
* SmartDashboard integrated updating.
*/

@Override

public void robotPeriodic() {

// Runs the Scheduler. This is responsible for polling buttons, adding newly-scheduled
// commands, running already-scheduled commands, removing finished or interrupted commands,
// and running subsystem periodic() methods. This must be called from the robot's periodic
// block in order for anything in the Command-based framework to work.

CommandScheduler.getInstance().run();

SmartDashboard.putBoolean("intake/Beam Break",beamBreak.get());

}
```