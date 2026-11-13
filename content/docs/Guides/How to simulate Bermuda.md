# 🧪 How to Simulate Bermuda (2025 Robot)

## 📦 1. Download Required Tools

### AdvantageScope
- [Download AdvantageScope v4.1.5](https://github.com/Mechanical-Advantage/AdvantageScope/releases/tag/v4.1.5)

### WPILib 2025
- [Setup WPILib 2025](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html)

---

## 🧰 2. Clone the 2025 Robot Code

1. Open **WPILib 2025**
2. Click `Clone Git Repository`  
   ![[Pasted image 20250329214451.png]]
3. Paste this URL:  
   `https://github.com/Vortx3735/2025-Bot.git`
4. Switch to the `advantagekit` branch  
   ![[Screenshot 2025-03-29 at 9.46.56 PM.png]]

---

## 🎛️ 3. Setup AdvantageScope

1. Set the game field to **2025 field**
   - (Optional) Change graphics to high quality.
2. On the top menu: `Help > Show Assets Folder`
3. In the opened window, paste this folder:
   - [2025 Field Assets Folder](https://drive.google.com/drive/folders/1W0RNTd30LbctrxuHa-7OD7X8ab-aRN-u?usp=drive_link)
4. The folder should look like:  
   ![[Pasted image 20250329215118.png]]  
   *(You don't need soundbyte)*

---

## ▶️ 4. Start the Simulation

1. Open **WPILib VSCode**
2. Click the WPILib logo (top right)  
   ![[Pasted image 20250329215210.png]]
3. Select `Simulate Robot Code` and **check** `Use Sim GUI`

---

## 🔌 5. Connect AdvantageScope

1. Open **AdvantageScope**
2. Top right menu: `File > Connect to Simulator`

---

## 📍 6. Publish the Robot Pose

1. Expand the dropdowns on the right:  
   `AdvantageKit > RealOutputs > FieldSimulation > RobotPosition`
2. Drag `RobotPosition` to the **center panel** under “Poses”  
   ![[Pasted image 20250329215621.png]]
   - If it says "2025 KitBot", **right-click** and rename to **bermuda**

---

## 🏗️ 7. Add Elevator & Wrist Poses

1. Under the dropdown: `simulation`  
   ![[Pasted image 20250329215808.png]]
2. **Drag the poses in this exact order** onto the robot pose:
   - **Elevator**  
     ![[Pasted image 20250329215904.png]]
     - If it’s not labeled “component”, right-click → `Change to component`
   - **Then Carriage**
   - **Then WristPose**
3. Final structure should look like:  
   ![[Pasted image 20250329220041.png]]

---

## 🍃 8. Add Game Pieces (Coral & Algae)

1. In the dropdowns:  
   `AdvantageKit > RealOutputs > FieldSimulation`
2. Drag `coral` and `algae` to the **Poses** tab
   - Right-click → `Change to correct game piece`  
   ![[Pasted image 20250329220247.png]]

---

## 🎮 9. Enable Teleop Mode in Sim GUI

- Enable Teleop
- **Make sure to assign your joysticks**

---
