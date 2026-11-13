```markdown
# Shooter Subsystem Documentation

## Overview
The `Shooter` subsystem is responsible for controlling the robot's shooter mechanism, which uses two CANSparkMax brushless motors. It employs PID control to achieve precise RPM (rotations per minute) for accurate shooting.

### Features:
- Dual-motor control for top and bottom rollers
- PID control for precise velocity management
- SmartDashboard integration for telemetry and monitoring
- Brake and coast modes for motor safety

---

## Code Overview

### Motor Initialization
The subsystem initializes two `CANSparkMax` motors for controlling the shooter:

```java
shooterNeo1 = new CANSparkMax(topMotor, MotorType.kBrushless);
shooterNeo2 = new CANSparkMax(bottomMotor, MotorType.kBrushless);
```

- **Motor 1** (`shooterNeo1`): Controls the top roller.
- **Motor 2** (`shooterNeo2`): Controls the bottom roller.
- Both motors are set to brake mode to prevent them from spinning when not powered.

---

## PID Control

### PID Controller Initialization
The `Shooter` subsystem uses two `SparkPIDController` instances to manage the velocity of the two motors:

```java
m_pidController1 = shooterNeo1.getPIDController();
m_pidController2 = shooterNeo2.getPIDController();
```

### PID Coefficients
The following coefficients are used for the PID control of both motors:

```java
kP = 0.0004;
kI = 0;
kD = 0;
kIz = 0;
kFF = 0.00017;
kMaxOutput = 1;
kMinOutput = -1;
```

These coefficients determine how the motors respond to velocity errors and are used to fine-tune the shooter's performance. The `m_pidController1` and `m_pidController2` are configured with these values.

---

## Movement Control

### `move(double speed)`
This method directly sets the speed for both motors. The top and bottom rollers move in opposite directions:

```java
public void move(double speed) {
    shooterNeo1.set(speed);
    shooterNeo2.set(-speed);
}
```

### `setShooterRPM(double input)`
Sets the RPM for both shooter motors using the PID controller. If the input RPM exceeds the defined maximum RPM (`ShooterConstants.maxRPM`), the method logs a warning message:

```java
public void setShooterRPM(double input) {
    if (input < ShooterConstants.maxRPM) {
        m_pidController1.setReference(input, ControlType.kVelocity);
        m_pidController2.setReference(-input, ControlType.kVelocity);
    } else {
        System.out.println("Shooter Motor Warning - Cannot Set Motor RPM Over Limit Of "
                + ShooterConstants.maxRPM);
    }
}
```

This ensures that the shooter motors do not exceed the maximum RPM limit and maintains accurate velocity control.

---

## Motor Modes

### `setBrakeMode(IdleMode mode)`
This method allows switching between **brake** and **coast** modes for the motors:

```java
public void setBrakeMode(IdleMode mode) {
    shooterNeo1.setIdleMode(mode);
    shooterNeo2.setIdleMode(mode);
}
```

- **Brake Mode**: Stops the motors immediately when power is cut, ensuring no continued motion.
- **Coast Mode**: Allows the motors to gradually slow down when power is cut, useful for smoother stopping in some cases.

### `coast()`
Stops both shooter motors by setting their speed to zero:

```java
public void coast() {
    shooterNeo1.set(0);
    shooterNeo2.set(0);
}
```

---

## Telemetry

The subsystem uses `SmartDashboard` to display telemetry data for monitoring shooter performance:

```java
// SmartDashboard.putNumber("shooter// Shooter Bottom RPM", shooterNeo2.getEncoder().getVelocity());
// SmartDashboard.putNumber("shooter// Shooter Top RPM", shooterNeo1.getEncoder().getVelocity());
// SmartDashboard.putNumber("shooter//Shooter Voltage", shooterNeo1.getBusVoltage());
```

Telemetry includes:
- **Shooter RPM**: Displays the current velocity of both motors.
- **Shooter Voltage**: Displays the voltage supplied to the motors.

---

## Periodic Functions

### `periodic()`
This method runs every scheduler cycle and can be used to update telemetry data:

```java
@Override
public void periodic() {
    // This method will be called once per scheduler run
}
```

### `simulationPeriodic()`
This method is used during simulations:

```java
@Override
public void simulationPeriodic() {
    // This method will be called once per scheduler run during simulation
}
```

---

## Future Enhancements
- Implement more advanced control algorithms to dynamically adjust RPM based on game conditions.
- Further tune the PID coefficients for enhanced performance during high-speed shooting.
- Add more telemetry data to monitor motor temperature and other important metrics during competition.

```

This documentation provides a structured overview of the Shooter subsystem, including details on motor control, PID settings, telemetry, and motor modes. It also suggests future improvements to enhance performance.