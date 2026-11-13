```markdown
# Arm Subsystem Documentation

## Overview
The `Arm` subsystem controls the robotic arm using two CANSparkMax brushless motors, an encoder for position tracking, and both PID and Feedforward controllers for precision movement.

### Features:
- Dual-motor control for arm movement
- Soft limits to prevent overextension
- PID control for holding positions
- Arm Feedforward control for smooth motion
- SmartDashboard integration for telemetry and tuning

---

## Code Overview

### Motor Initialization
The subsystem initializes two `CANSparkMax` motors for controlling the arm:

```java
this.ArmNeo1 = new CANSparkMax(leftMotor, MotorType.kBrushless);
this.ArmNeo2 = new CANSparkMax(rightMotor, MotorType.kBrushless);
```

- **Motor 1** (`ArmNeo1`): Left motor (Master)
- **Motor 2** (`ArmNeo2`): Right motor (Follower)
- Motors are set to brake mode to avoid uncontrolled movements when the power is off.

### Encoder Initialization
The `DutyCycleEncoder` tracks the position of the arm:

```java
private final DutyCycleEncoder armEncoder = new DutyCycleEncoder(0);
```

The encoder is used to measure the arm's position and is configured with an offset to correct for initial alignment issues.

---

## Movement Control

### Direct Motor Control

- **`move(double percentSpeed)`**: Directly sets motor speed.
- **`up(double percentSpeed)`**: Moves the arm up if it hasn’t reached the upper limit.
- **`down(double percentSpeed)`**: Moves the arm down if it hasn’t reached the lower limit.

### Soft Limits
Soft limits prevent the arm from moving outside the desired range:

```java
if (position < 0.24) {
    move(percentSpeed);  // Allow upward movement
}

if (position > 0.025) {
    move(-percentSpeed); // Allow downward movement
}
```

---

## Position Control

### PID Control
A PID controller is used to hold the arm at a specific position. The constants for the PID loop are initialized as follows:

```java
kp = 0.01;
ki = 0.0;
kd = 0.0;
hold = new PIDController(kp, ki, kd);
```

### Feedforward Control
The feedforward controller is responsible for ensuring smooth motion, compensating for gravity and inertia:

```java
armFF = new ArmFeedforward(ks, kg, kv, ka);
```

---

## Key Methods

### `move(double percentSpeed)`
Sets the motor speed directly, allowing for manual control of the arm’s motion.

### `up(double percentSpeed)`
Moves the arm upward while checking for the soft upper limit.

### `down(double percentSpeed)`
Moves the arm downward while checking for the soft lower limit.

### `hold()`
Maintains the arm at its current position using the PID controller:

```java
ArmNeo1.set(hold.calculate(position * 2 * Math.PI, setpoint * 2 * Math.PI) + armFF.calculate(position * 2 * Math.PI, kv));
```

### `getArmPos()`
Returns the current arm position from the encoder.

---

## Telemetry

The subsystem uses the `SmartDashboard` to display telemetry data:

- **Arm Position**: `SmartDashboard.putNumber("arm//ArmEncoder", position);`

---

## Constants

The constants for this subsystem are defined in `ArmConstants` for easy modification:

```java
public class ArmConstants {
    public static final double encoderPitchDiameter = /* ... */;
    public static final double groundArmPos = /* ... */;
}
```

---

## Periodic Functions

### `periodic()`
This method updates the arm’s position every scheduler run and displays the data on the SmartDashboard.

```java
@Override
public void periodic() {
    raw_position = armEncoder.getAbsolutePosition();
    if (raw_position < offset) {
        position = 1 + raw_position - offset;
    } else {
        position = raw_position - offset;
    }
    SmartDashboard.putNumber("arm//ArmEncoder", position);
}
```

---

## Future Enhancements
- Integrate more sophisticated motion planning (e.g., trajectory following).
- Tune the PID and Feedforward controllers for more precise arm control.
- Implement additional soft limit protections for motor safety.

```

This documentation is structured to give an overview of the arm subsystem, explain key components like motor control and feedback systems, and describe methods in detail.

