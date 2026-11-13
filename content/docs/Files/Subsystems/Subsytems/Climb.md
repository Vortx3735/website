```markdown
# Climb Subsystem Documentation

## Overview
The `Climb` subsystem is responsible for controlling the robot's climbing mechanism using two CANSparkMax brushless motors. Each motor can be controlled independently or together, allowing for precise control of the robot's climb during competition.

### Features:
- Dual-motor control for climbing
- Independent or synchronized motor control
- Idle mode configuration for motor safety (Brake/Coast)
- Soft limit configuration (commented out but available for future use)
- Telemetry integration for monitoring motor performance (RPM and voltage)

---

## Code Overview

### Motor Initialization
The subsystem initializes two `CANSparkMax` motors for controlling the climbing mechanism:

```java
climbNeo1 = new CANSparkMax(leftMotor, MotorType.kBrushless);
climbNeo2 = new CANSparkMax(rightMotor, MotorType.kBrushless);
```

- **Motor 1** (`climbNeo1`): Left-side motor
- **Motor 2** (`climbNeo2`): Right-side motor
- Motors are set to brake mode by default to prevent slippage when the robot is stationary.

---

## Movement Control

### Independent Motor Control

- **`moveLeft(double speed)`**: Controls the left motor (climbNeo1).
- **`moveRight(double speed)`**: Controls the right motor (climbNeo2).

```java
public void moveLeft(double speed) {
    climbNeo1.set(speed);
}

public void moveRight(double speed) {
    climbNeo2.set(speed);
}
```

These methods allow independent control of each motor, providing flexibility in how the robot's climbing mechanism operates.

### Synchronized Motor Control

- **`moveBoth(double speed)`**: Controls both motors at the same time for synchronized climbing.

```java
public void moveBoth(double speed) {
    climbNeo1.set(speed);
    climbNeo2.set(speed);
}
```

This method ensures both motors move together, allowing the robot to climb uniformly.

---

## Motor Idle Mode

### `setIdle(IdleMode idle)`
This method allows the setting of the idle mode for both motors. Motors can either be in **Brake** mode (default) or **Coast** mode:

```java
public void setIdle(IdleMode idle) { 
    climbNeo1.setIdleMode(idle);
    climbNeo2.setIdleMode(idle);
}
```

- **Brake Mode**: Stops the motor immediately when power is cut, useful for preventing slippage.
- **Coast Mode**: Allows the motor to gradually come to a stop, which can be beneficial for smoother descent.

---

## Stopping the Motors

### `coast()`
Stops both motors by setting their speed to 0:

```java
public void coast() {
    climbNeo1.set(0);
    climbNeo2.set(0);
}
```

---

## Future Enhancements

### Soft Limits (Commented out for Future Use)
Soft limits for the motors can be configured to prevent overextension during the climb:

```java
// climbNeo1.setSoftLimit(SoftLimitDirection.kForward, Constants.ClimbConstants.CLIMB_SOFT_LIMIT_FWD);
// climbNeo1.setSoftLimit(SoftLimitDirection.kReverse, 0);
```

These limits are currently commented out but can be enabled when needed for additional safety during operation.

---

## Telemetry

The subsystem can send telemetry data to the SmartDashboard, although it is currently commented out:

```java
// SmartDashboard.putNumber("climb/Climb RPM", climbEncoder.getVelocity());
// SmartDashboard.putNumber("climb/Climb Voltage", climbNeo1.getBusVoltage());
```

- **Climb RPM**: Displays the motor's velocity.
- **Climb Voltage**: Displays the voltage supplied to the motor.

This telemetry can be used to monitor the performance of the climb motors during a match.

---

## Periodic Functions

### `periodic()`
This method runs every scheduler cycle and can be used to update telemetry data or perform routine checks.

```java
@Override
public void periodic() {
    // This method will be called once per scheduler run
}
```

### `simulationPeriodic()`
This method is used when running simulations.

```java
@Override
public void simulationPeriodic() {
    // This method will be called once per scheduler run during simulation
}
```

---

## Constants

The constants for the Climb subsystem, such as soft limits, can be stored in the `ClimbConstants` class for easy modification and tuning.

---

## Future Improvements

- Enable and tune soft limits for better motor safety.
- Add telemetry for real-time performance monitoring during competition.
- Implement more sophisticated control mechanisms if needed for advanced climbing strategies.

```

This documentation provides a detailed overview of the Climb subsystem, explaining the key methods and functionalities, including movement control, motor safety features, and future improvements.