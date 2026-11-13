# VorTX command structure

## base commands
These commands that only use 1 subsystem. For example, move elevator to level 2. Put these commands directly into their respective subsystems.
![[Screenshot 2025-05-21 161328.png]]
## multi-subsystem commands
These are commands that use base commands from different subsystems. For example, score on level two of the reef. Put these in the command factory file and group them together using either parallel command or sequential command group.
![[Screenshot 2025-05-21 161402.png]]
## complex commands
These are commands that require more intricate logic. For example, auto-align to an apriltag. Put these in their own file and override the initialize/execute/interrupted/end fields with your code.
![[Screenshot 2025-05-21 161530.png]]
