The Robot Container is the file that acts as the central Hub for the robot's code it's primarily responsible thse 4 functions

Subsystem Initialization: Creates all your robot's subsystems(Intake, Climb, Arm, Etc)

Command Initialization: Creates commands that use those subsystems

Controller Setup: Sets up your Xbox controller for configuring Keybinds

Button Bindings: Connects controller buttons to commands

Below is a snippet of code showing how the Robot Container works using an Intake Mechanism as an Example With the X button starting the Intake and the A button stoping it
```Ex:
package frc.robot;

import frc.robot.util.VorTXControllerXbox;
import frc.robot.subsystems.Intake;
import frc.robot.commands.IntakeCom;

public class RobotContainer {
  // 1. Initialize Subsystems
  public static Intake intake = new Intake(16);
  
  // 2. Initialize Commands
  public static IntakeCom intakecom = new IntakeCom(intake);
  
  // 3. Initialize Controller
  private final VorTXControllerXbox con2 = new VorTXControllerXbox(1); // Port 1

  public RobotContainer() {
    // 4. Configure button bindings
    configureBindings();
    
    // 5. Set default commands (optional)
    intake.setDefaultCommand(
      new RunCommand(
        intake::stopIntake,
        intake
      )
    );
  }

  private void configureBindings() {
    // Button binding examples
    con2.xButton.whileTrue(intakecom.intakeNoteCom());
    con2.aButton.onTrue(new RunCommand(() -> intake.stopIntake(), intake));
  }
}

```




Our Robots Use button bindings that are available from our custom VorTX Xbox controller library. These are the options for bindings.
```
aButton, bButton, xButton, yButton, view, menu, ls, rs, lb, rb, lt, rt,
povUp, povUpRight, povRight, povDownRight, povDown, povDownLeft, povLeft, povUpLeft
```

Put the command / subsystem to use for the button binding inside a function. 
```Ex:
con2.xButton.whileTrue(

	intakecom.intakeNoteCom()

);
```
There are multiple ways to Configure Bindings you can program it to where you have to click it once or to where you have to hold down the button once 
below are some examples 

```Ex:
private void configureBindings() {
  // Run command while button is held
  con2.aButton.whileTrue(intakecom.intakeNoteCom());
  
  // Run command once when button is pressed
  con2.bButton.onTrue(new InstantCommand(() -> intake.reverseIntake()));
  
  // Run command continuously while button is held
  con2.lb.whileTrue(new RunCommand(() -> intake.slowIntake(), intake));
  
  // Use D-pad buttons
  con2.povUp.onTrue(new InstantCommand(() -> elevator.moveUp()));
  con2.povDown.onTrue(new InstantCommand(() -> elevator.moveDown()));
}
```
Default Commands-Default Commands are commands that run on auton on a Subsystem when another Command isn't using it
Example of run commands 
```Ex:
intake.setDefaultCommand(
	new RunCommand(
		intake::stopIntake,
		intake
	)
);
```

In conclusion make sure to remember these key points when using Robot Container
We Initialize subsystems first, then commands that use them

Controller Ports: Make sure you're using the correct port numbers (We use 0 for driver and 1 for operator)

Button Types:

.whileTrue(): Runs while button is held

.onTrue(): Runs once when pressed

.onFalse(): Runs once when released

Default Commands: These run automatically when no other command is using the subsystem
