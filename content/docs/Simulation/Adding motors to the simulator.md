## Simulating motors of a subsystem
All of the sim code can be placed in the subsystem.
First, we add the motor physics simulation
Above your subsystem constructor, add these lines of code:
```
private static final double kGearRatio = 10.0;
private static final double kMOI = 0.001;
private final DCMotorSim m_motorSimModel = new DCMotorSim(
   LinearSystemId.createDCMotorSystem(
      DCMotor.getKrakenX60(1), kMOI, kGearRatio
   ),
   DCMotor.getKrakenX60(1)
);
```
You can change the gear ratio and the moment of inertia to more closely match the robot (get these values from the cad).
If a different motor is used, change .getKrakenX60(1) to whatever motor you are using.

Next, assuming you are using talon motors (all motors on the 2026 robot are talons), add these lines of code to the constructor:
```
var talonFXSim = turretMotor.getSimState();
talonFXSim.Orientation = ChassisReference.CounterClockwise_Positive;
talonFXSim.setMotorType(TalonFXSimState.MotorType.KrakenX60);
```
This initializes the simulated motor object

Finally, add these lines of code to the simulationperiodic method of the subsystem:
```
var talonFXSim = [actual motor object].getSimState();

    talonFXSim.setSupplyVoltage(12);

    var motorVoltage = talonFXSim.getMotorVoltageMeasure();

    m_motorSimModel.setInputVoltage(motorVoltage.in(Volts));
    m_motorSimModel.update(0.020); // assume 20 ms loop time

    talonFXSim.setRawRotorPosition(m_motorSimModel.getAngularPosition().times(kGearRatio));
    talonFXSim.setRotorVelocity(m_motorSimModel.getAngularVelocity().times(kGearRatio));

    position = m_motorSimModel.getAngularPosition().in(Units.Rotations);
```
This will periodically update the motor position using the applied voltage and the physics simulation. 
You can then publish the position value to see it in the simulator:
```
Logger.recordOutput("[subsystem name]/simulated[subsystem]position", position);
```