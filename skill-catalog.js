const SKILL_GROUPS = [
  { id: "bike-control", name: "Bike Control", description: "Move with the bike, not against it.", accent: "lime" },
  { id: "braking", name: "Braking", description: "Find control in every lever input.", accent: "teal" },
  { id: "cornering", name: "Cornering", description: "Turn with intention and usable grip.", accent: "amber" },
  { id: "climbing", name: "Climbing", description: "Balance position, traction, and timing.", accent: "lime" },
  { id: "descending", name: "Descending", description: "Stay composed as the trail points down.", accent: "teal" },
  { id: "obstacles", name: "Obstacles", description: "Read the feature before riding it.", accent: "amber" },
  { id: "wheel-control", name: "Wheel Control", description: "Build precise, independent wheel movement.", accent: "lime" },
  { id: "air-skills", name: "Air Skills", description: "Start with control; progress with coaching.", accent: "amber" },
  { id: "trail-reading", name: "Trail Reading", description: "Notice sooner. Leave yourself options.", accent: "teal" },
  { id: "mindset", name: "Mindset", description: "Make calm choices and repeat good habits.", accent: "lime" }
];

const SKILL_CATALOG = [
  {
    id: "ready-position",
    name: "Riding position",
    level: "Beginner",
    category: "Bike Control",
    summary: "Find a relaxed, centered position that lets the bike move beneath you.",
    prerequisites: [],
    setting: "A wide, flat, traffic-free space with a clear stopping area.",
    drill: [
      "Roll at walking pace and alternate between sitting and standing with level pedals.",
      "Keep elbows and knees relaxed while making small changes in body position.",
      "Return to a comfortable, centered position and stop before repeating."
    ],
    checks: ["I can stand without pulling on the handlebar.", "I can look ahead and keep a relaxed grip."],
    safety: "Choose a clear surface and keep the practice slow enough to stop comfortably."
  },
  {
    id: "attack-position",
    name: "Attack position",
    level: "Beginner",
    category: "Bike Control",
    summary: "Move from a neutral stance into an adaptable ready position before the terrain changes.",
    prerequisites: ["ready-position"],
    setting: "A smooth, level practice area with plenty of room.",
    drill: [
      "Roll slowly in your normal standing position with level pedals.",
      "Lower into a comfortable ready stance, leaving room for your arms and legs to move.",
      "Alternate between the two positions without gripping harder or pulling on the bars."
    ],
    checks: ["I have movement available in my arms and legs.", "I can change position without upsetting my line."],
    safety: "Do not hold a rigid, exaggerated crouch. Practice on flat ground before taking it onto uneven terrain."
  },
  {
    id: "riding-vision",
    name: "Looking ahead",
    level: "Beginner",
    category: "Bike Control",
    summary: "Direct your gaze toward where you intend to ride rather than fixing on the front wheel.",
    prerequisites: ["ready-position"],
    setting: "An open, smooth area with widely spaced markers.",
    drill: [
      "Ride a broad, simple route between the markers at a comfortable pace.",
      "Look toward the next clear section while staying aware of the ground immediately ahead.",
      "Repeat in both directions and notice when your gaze drops or fixes on an obstacle."
    ],
    checks: ["My gaze supports my chosen direction.", "I stay aware of nearby ground without staring down."],
    safety: "Slow down when visibility is limited. Looking farther ahead is not a reason to ride faster."
  },
  {
    id: "track-stands",
    name: "Track stands",
    level: "Intermediate",
    category: "Bike Control",
    summary: "Develop low-speed balance and make brief pauses feel less rushed.",
    prerequisites: ["ready-position", "braking-control"],
    setting: "A flat, open area with a familiar, easy-to-release pedal setup.",
    drill: [
      "Slow to a near stop with plenty of room around you.",
      "Make small steering and pressure adjustments while keeping your gaze steady.",
      "Put a foot down whenever needed, then reset without chasing a long hold."
    ],
    checks: ["I can pause briefly without tensing my shoulders.", "I can step off calmly in either direction."],
    safety: "Keep holds short and choose somewhere a foot-down or dismount is uncomplicated."
  },
  {
    id: "body-bike-separation",
    name: "Body-bike separation",
    level: "Intermediate",
    category: "Bike Control",
    summary: "Let the bike lean and move independently while your body remains balanced and adaptable.",
    prerequisites: ["ready-position", "attack-position"],
    setting: "Flat, grippy ground with a wide, clear practice lane.",
    drill: [
      "Roll slowly in a relaxed standing position.",
      "Explore small side-to-side bike movements while keeping your body balanced over your support.",
      "Return to neutral between movements and repeat without tightening your grip."
    ],
    checks: ["I can move the bike without moving my whole body rigidly with it.", "My arms and legs stay relaxed and available."],
    safety: "Keep the movements small. Do not practice leaning near edges, traffic, or slippery ground."
  },
  {
    id: "braking-control",
    name: "Progressive braking",
    level: "Beginner",
    category: "Braking",
    summary: "Build brake pressure smoothly for predictable stops without snatching the levers.",
    prerequisites: ["ready-position"],
    setting: "Firm, level ground with generous run-out and no traffic.",
    drill: [
      "Pick a visible stopping zone and approach it at walking pace.",
      "Apply both brakes progressively, adjusting pressure to keep the wheels rolling.",
      "Release, reset, and repeat with the same low approach speed."
    ],
    checks: ["I can stop within my chosen zone without a skid.", "I keep my gaze up and my body balanced."],
    safety: "Check both brakes before starting and avoid abrupt front-brake inputs."
  },
  {
    id: "emergency-braking",
    name: "Emergency braking",
    level: "Intermediate",
    category: "Braking",
    summary: "Practice a deliberate, controlled stop so an urgent situation feels less unfamiliar.",
    prerequisites: ["braking-control", "attack-position"],
    setting: "Level, grippy ground with a long clear run-out, preferably with a coach.",
    drill: [
      "Agree a visible stopping cue and begin with a slow, predictable approach.",
      "Respond to the cue by applying both brakes progressively while staying balanced.",
      "Reset and discuss control and stopping space before changing the exercise."
    ],
    checks: ["I respond without grabbing a lever suddenly.", "I can stop in control and put a foot down calmly."],
    safety: "Do not create surprise obstacles or chase the shortest stopping distance. Keep the approach slow and the surface predictable."
  },
  {
    id: "brake-modulation",
    name: "Brake modulation",
    level: "Intermediate",
    category: "Braking",
    summary: "Adjust brake pressure to manage speed and preserve grip as conditions change.",
    prerequisites: ["braking-control"],
    setting: "A smooth, nearly level practice lane with a clear exit.",
    drill: [
      "Roll slowly and gently build pressure on both brake levers.",
      "Ease the pressure to keep moving, then build it again without abrupt changes.",
      "Repeat the same sequence until the changes in speed feel smooth."
    ],
    checks: ["I can vary pressure rather than treating the brakes as on or off.", "My wheels keep rolling during the exercise."],
    safety: "Do not deliberately provoke skids. Stop if grip, brake performance, or control becomes uncertain."
  },
  {
    id: "slope-braking",
    name: "Braking on slopes",
    level: "Intermediate",
    category: "Braking",
    summary: "Use progressive, balanced braking on a gentle slope without becoming rigid.",
    prerequisites: ["brake-modulation", "descending-position"],
    setting: "A short, smooth, gentle slope with a wide, flat run-out.",
    drill: [
      "Walk the slope and choose a visible, comfortable stopping zone.",
      "Roll slowly with relaxed joints and progressively manage speed with both brakes.",
      "Stop in the chosen zone, then review any wheel locking or tension."
    ],
    checks: ["I keep movement available while braking.", "I can control my speed without locking a wheel."],
    safety: "Start on a mild gradient. Steep or slippery slopes require a separate assessment and qualified coaching."
  },
  {
    id: "flat-cornering",
    name: "Flat cornering",
    level: "Beginner",
    category: "Cornering",
    summary: "Look through a turn, manage entry speed, and follow a smooth arc.",
    prerequisites: ["riding-vision", "braking-control"],
    setting: "A flat, grippy open area with two widely spaced markers.",
    drill: [
      "Ride large, gentle turns around the markers at low speed.",
      "Set a comfortable speed before each turn and look toward its exit.",
      "Practice both directions while keeping movements smooth."
    ],
    checks: ["I look toward the exit rather than at the front wheel.", "I repeat wide turns without sudden braking or steering."],
    safety: "Start with plenty of space; there is no need to tighten the turns or add speed."
  },
  {
    id: "berms",
    name: "Berms",
    level: "Intermediate",
    category: "Cornering",
    summary: "Read a supported turn and choose a line that matches your speed and available grip.",
    prerequisites: ["flat-cornering", "body-bike-separation"],
    setting: "A wide, low, dry berm on a beginner-friendly trail or practice area.",
    drill: [
      "Walk the berm and identify its entrance, support, and clear exit.",
      "Set a conservative entry speed and look through the turn.",
      "Repeat one predictable line instead of moving higher or riding faster."
    ],
    checks: ["I set my speed before entering.", "I follow the same comfortable line without abrupt corrections."],
    safety: "Stay within a line you can control; avoid steep, damaged, or slippery berms."
  },
  {
    id: "off-camber-turns",
    name: "Off-camber cornering",
    level: "Advanced",
    category: "Cornering",
    summary: "Read limited support and available grip when the ground slopes away from a turn.",
    prerequisites: ["flat-cornering", "body-bike-separation", "brake-modulation"],
    setting: "A mild, dry, non-exposed practice slope selected with a coach.",
    drill: [
      "Inspect the surface, available grip, and safe exit before riding.",
      "Choose a wide, conservative line and set your speed before the turn.",
      "Practice one small section and review any sliding or abrupt corrections."
    ],
    checks: ["I recognize when conditions call for a different line or a walk.", "I keep inputs smooth rather than rescuing the turn late."],
    safety: "Avoid exposure and slippery surfaces. Walking is a valid choice when grip is uncertain."
  },
  {
    id: "switchbacks",
    name: "Switchbacks",
    level: "Intermediate",
    category: "Cornering",
    summary: "Plan tighter turns without rushing the entrance or fixating on the inside edge.",
    prerequisites: ["flat-cornering", "track-stands"],
    setting: "Widely spaced markers arranged as a loose switchback on flat ground.",
    drill: [
      "Start with a generous turn radius and a slow approach.",
      "Look toward each exit and use the available space deliberately.",
      "Practice both directions before considering a tighter layout."
    ],
    checks: ["I plan the turn before reaching its tightest point.", "I can put a foot down or stop without feeling trapped."],
    safety: "Do not use exposed trail switchbacks as a practice area."
  },
  {
    id: "climbing-position",
    name: "Climbing position",
    level: "Beginner",
    category: "Climbing",
    summary: "Find a position that supports steering, traction, and comfortable pedaling uphill.",
    prerequisites: ["ready-position"],
    setting: "A short, smooth, low-gradient climb with safe stopping spots.",
    drill: [
      "Choose a manageable gear before the slope and begin seated.",
      "Make small position adjustments while keeping your upper body relaxed.",
      "Notice how balance and steering change, then stop and reset."
    ],
    checks: ["I can steer without the front wheel wandering excessively.", "I remain balanced rather than pulling hard on the bars."],
    safety: "Keep the climb short and gentle, with space to put a foot down safely."
  },
  {
    id: "climbing-traction",
    name: "Climbing traction",
    level: "Intermediate",
    category: "Climbing",
    summary: "Combine smooth pedal pressure and balanced positioning to preserve uphill grip.",
    prerequisites: ["climbing-position"],
    setting: "A familiar, gentle climb with firm, predictable ground.",
    drill: [
      "Select an easy gear before the climb and settle into an even cadence.",
      "Maintain smooth pedal pressure instead of surging through each stroke.",
      "Stop and review any loss of traction before repeating."
    ],
    checks: ["I avoid sudden bursts of pedal force.", "I notice changes in grip before forcing the effort."],
    safety: "Avoid steep, loose, or wet surfaces while learning. Dismount if traction becomes unreliable."
  },
  {
    id: "technical-climbing",
    name: "Technical climbing",
    level: "Intermediate",
    category: "Climbing",
    summary: "Combine line selection and smooth pedaling on an uneven but manageable climb.",
    prerequisites: ["climbing-traction", "line-choice", "ratcheting"],
    setting: "A short, gentle climb with small, dry surface variations and safe stopping spots.",
    drill: [
      "Walk the section and choose a simple line with good traction.",
      "Select your gear early and plan where there is room for pedal strokes.",
      "Stop and review any loss of grip or clearance before trying again."
    ],
    checks: ["I plan pedal clearance rather than reacting late.", "I have a safe place to stop if the attempt does not work."],
    safety: "Avoid steep or slippery features and never force a stalled attempt."
  },
  {
    id: "descending-position",
    name: "Descending position",
    level: "Beginner",
    category: "Descending",
    summary: "Maintain an adaptable, balanced stance as the ground slopes downhill.",
    prerequisites: ["attack-position", "braking-control"],
    setting: "A short, smooth, gentle descent with a wide, flat run-out.",
    drill: [
      "Inspect the slope and choose a clear stopping point.",
      "Roll slowly with level pedals and relaxed arms and legs.",
      "Return to flat ground and review whether you stayed balanced or became rigid."
    ],
    checks: ["I leave movement available instead of locking my arms.", "I can use the brakes without losing my balance."],
    safety: "Avoid exaggerated positions and steep terrain. Seek coaching if you feel unable to move or brake comfortably."
  },
  {
    id: "controlled-descents",
    name: "Speed control",
    level: "Beginner",
    category: "Descending",
    summary: "Choose and maintain a manageable pace rather than letting the slope choose it for you.",
    prerequisites: ["descending-position", "braking-control"],
    setting: "A short, familiar, gentle descent with good visibility and a clear run-out.",
    drill: [
      "Identify a manageable line and a stopping zone before starting.",
      "Use smooth brake inputs to keep your speed comfortable throughout the section.",
      "Stop as planned and review any point where your speed felt imposed by the terrain."
    ],
    checks: ["My pace leaves time to respond to what I can see.", "I arrive at the stopping zone without rushed braking."],
    safety: "Slow down for limited visibility and other trail users. A rating never determines a safe speed."
  },
  {
    id: "descending-line-choice",
    name: "Descending line choice",
    level: "Intermediate",
    category: "Descending",
    summary: "Choose downhill lines that connect grip, braking options, and a clear exit.",
    prerequisites: ["controlled-descents", "line-choice"],
    setting: "An easy, familiar descent that can be inspected without blocking the trail.",
    drill: [
      "Walk a short section and identify surface changes and possible braking areas.",
      "Choose the simplest line that leaves room to slow down and exit safely.",
      "Ride it at a controlled pace, then compare the result with your plan."
    ],
    checks: ["I consider where I can slow down, not just where the wheels fit.", "My chosen line has a visible, manageable exit."],
    safety: "Avoid exposed sections and unknown features. Walk when there is no line within your current control."
  },
  {
    id: "roots",
    name: "Roots",
    level: "Intermediate",
    category: "Obstacles",
    summary: "Identify changes in grip and let the bike move over small, predictable roots.",
    prerequisites: ["body-bike-separation", "line-choice", "brake-modulation"],
    setting: "A short section with small, dry, rollable roots and no exposure.",
    drill: [
      "Inspect the roots for grip, wheel-catching shapes, and a clear exit.",
      "Choose the easiest rollable line and approach with relaxed joints.",
      "Stop beyond the section and review any tension or abrupt input."
    ],
    checks: ["I assess root shape and grip before entering.", "I remain adaptable as the wheels cross the surface change."],
    safety: "Wet roots can be very slippery. Walk uncertain sections and do not use large or angled roots as a starting exercise."
  },
  {
    id: "rocks",
    name: "Rocks",
    level: "Intermediate",
    category: "Obstacles",
    summary: "Read small rocky sections and choose a line that avoids wheel-catching edges.",
    prerequisites: ["body-bike-separation", "line-choice"],
    setting: "A short, dry section with small, stable, rollable rocks and generous stopping space.",
    drill: [
      "Walk the section and identify loose stones, sharp edges, and exits.",
      "Choose the simplest manageable line rather than the most direct one.",
      "Ride a short part with relaxed joints and review your balance before continuing."
    ],
    checks: ["I distinguish stable surfaces from loose or catching edges.", "I follow a planned line without bracing against the bike."],
    safety: "Loose or wet rocks change difficulty substantially. Larger rock gardens call for separate preparation and coaching."
  },
  {
    id: "steps",
    name: "Steps",
    level: "Intermediate",
    category: "Obstacles",
    summary: "Assess small trail steps and prepare wheel movement before meeting an edge.",
    prerequisites: ["front-wheel-lifts", "rear-wheel-lifts", "line-choice"],
    setting: "A coaching area with a very small practice edge chosen by a qualified coach.",
    drill: [
      "Inspect the edge, approach, and exit with a coach before riding.",
      "Rehearse the required wheel-unweighting movements on flat ground.",
      "Practice only a feature the coach has confirmed is appropriate, then reset."
    ],
    checks: ["I know whether the edge is suitable to roll or needs another technique.", "I can decline the feature before committing to it."],
    safety: "Do not use public staircases or unknown square edges. A small-looking step can still stop a wheel abruptly."
  },
  {
    id: "rollable-features",
    name: "Roll-downs",
    level: "Intermediate",
    category: "Obstacles",
    summary: "Stay balanced through small downward terrain transitions that are confirmed to be rollable.",
    prerequisites: ["descending-position", "body-bike-separation"],
    setting: "A coached practice area with a clearly rollable transition and generous run-out.",
    drill: [
      "Walk the feature with a coach and confirm a suitable roll-through line.",
      "Rehearse the approach and stopping point without attempting a jump.",
      "Roll the agreed feature at a controlled pace and review your position."
    ],
    checks: ["I know the complete shape of the feature and exit.", "I remain balanced as the ground changes angle."],
    safety: "A roll-down is not the same as a non-rollable drop. Confirm suitability rather than judging only its apparent size."
  },
  {
    id: "front-wheel-lifts",
    name: "Front-wheel lift",
    level: "Intermediate",
    category: "Wheel Control",
    summary: "Explore controlled front-wheel unweighting with a gentle return to the ground.",
    prerequisites: ["attack-position", "body-bike-separation"],
    setting: "Level, traffic-free ground with no obstacle to clear.",
    drill: [
      "Review a suitable unweighting movement with a qualified coach.",
      "Practice a very small lift at low speed, prioritizing balance rather than height.",
      "Return the wheel smoothly and reset between attempts."
    ],
    checks: ["I do not rely on a sharp handlebar pull.", "I can put the wheel down smoothly on my chosen line."],
    safety: "Learn balance and safe exits with a coach before adding obstacles or height."
  },
  {
    id: "rear-wheel-lifts",
    name: "Rear-wheel lift",
    level: "Intermediate",
    category: "Wheel Control",
    summary: "Learn deliberate rear-wheel unweighting while maintaining a balanced, controlled return.",
    prerequisites: ["attack-position", "body-bike-separation", "braking-control"],
    setting: "Flat, open ground under the guidance of a qualified MTB coach.",
    drill: [
      "Have a coach check your basic position and demonstrate an appropriate movement.",
      "Rehearse a small unweighting movement without trying to clear an obstacle.",
      "Reset after each attempt and focus on a quiet, balanced return to the ground."
    ],
    checks: ["I avoid yanking on clipped-in pedals.", "I stay controlled rather than pitching abruptly forward."],
    safety: "Rear-wheel lifts can involve a forward-fall risk. Do not grab the front brake or add height without in-person guidance."
  },
  {
    id: "ratcheting",
    name: "Ratcheting",
    level: "Intermediate",
    category: "Wheel Control",
    summary: "Use short, controlled pedal movements where a full rotation would reduce clearance.",
    prerequisites: ["ready-position", "track-stands"],
    setting: "Flat, open ground before introducing any trail obstacles.",
    drill: [
      "Roll slowly and alternate gentle partial pedal strokes with coasting.",
      "Return the cranks deliberately without forcing the drivetrain.",
      "Use flat markers to rehearse choosing where a pedal stroke has enough clearance."
    ],
    checks: ["I can keep moving without an uncontrolled pedal surge.", "I plan pedal clearance before reaching an obstacle."],
    safety: "Practice without actual wheel-catching edges first. Stop if the drivetrain skips or does not engage predictably."
  },
  {
    id: "pivots",
    name: "Pivots",
    level: "Advanced",
    category: "Wheel Control",
    summary: "Develop precise wheel repositioning with balance, brake control, and qualified feedback.",
    prerequisites: ["track-stands", "rear-wheel-lifts", "brake-modulation"],
    setting: "An open, level coaching area with a clear dismount space.",
    drill: [
      "Ask a coach to select a pivot variation suited to your current wheel control.",
      "Rehearse balance, brake inputs, and safe exits before adding rotation.",
      "Practice only a small, supervised movement and reset completely between attempts."
    ],
    checks: ["I can exit an attempt calmly rather than forcing the rotation.", "I reposition deliberately instead of throwing my weight."],
    safety: "Pivots can carry a forward-fall risk. Do not practice them on steep or exposed turns."
  },
  {
    id: "manuals",
    name: "Manual",
    level: "Advanced",
    category: "Air Skills",
    summary: "Work on controlled balance and timing rather than holding the front wheel up for distance.",
    prerequisites: ["front-wheel-lifts", "brake-modulation"],
    setting: "An open, level coaching area with clear space and appropriate protective gear.",
    drill: [
      "Agree a safe practice setup and exit strategy with a coach.",
      "Revisit very small front-wheel lifts with a deliberate return to the ground.",
      "Use feedback to develop control before attempting sustained balance."
    ],
    checks: ["I can bring the front wheel down deliberately.", "I stop an attempt rather than chasing the balance point."],
    safety: "Manuals carry a backward-fall risk. Learn safe exits and brake control with in-person coaching."
  },
  {
    id: "bunny-hops",
    name: "Bunny hop",
    level: "Advanced",
    category: "Air Skills",
    summary: "Coordinate wheel unweighting and a controlled landing before considering obstacle height.",
    prerequisites: ["front-wheel-lifts", "rear-wheel-lifts"],
    setting: "Level, open ground under the supervision of a qualified MTB coach.",
    drill: [
      "Have a coach check wheel-unweighting fundamentals and safe exits.",
      "Rehearse a small coordinated movement without an obstacle.",
      "Reset after each attempt and prioritize a straight, quiet landing."
    ],
    checks: ["I repeat the movement without a rushed pull or pedal tug.", "I land balanced and continue along my intended line."],
    safety: "Do not add obstacles or height until a coach has assessed the basic movement."
  },
  {
    id: "drops",
    name: "Drops",
    level: "Advanced",
    category: "Air Skills",
    summary: "Develop judgment and coordinated movement for drops in a controlled coaching environment.",
    prerequisites: ["rollable-features", "attack-position"],
    setting: "A low-consequence coaching area with suitable progression features and clear run-out.",
    drill: [
      "Inspect the feature shape, landing, and exit with a qualified coach.",
      "Rehearse approach and terrain-transition control on a confirmed rollable feature first.",
      "Let the coach assess consistency before introducing a non-rollable feature."
    ],
    checks: ["I identify the ride-around and decide before committing.", "I repeat the prerequisite movement with a balanced exit."],
    safety: "A drop is not necessarily rollable. Do not attempt unknown edges or use a rating as proof of readiness."
  },
  {
    id: "tabletop-jumps",
    name: "Jumps",
    level: "Advanced",
    category: "Air Skills",
    summary: "Build a coached understanding of approach, takeoff, and landing without making airtime the goal.",
    prerequisites: ["pumping", "front-wheel-lifts", "body-bike-separation"],
    setting: "A purpose-built beginner coaching line with features selected by a qualified coach.",
    drill: [
      "Inspect the approach, feature, landing, and ride-around with the coach.",
      "Rehearse roll-throughs only on features confirmed to be fully rollable.",
      "Use individual feedback before progressing beyond ground-based preparation."
    ],
    checks: ["I understand the complete feature and can choose the ride-around.", "My preparation is repeatable before another challenge is added."],
    safety: "Not all tabletops are safe to roll. Do not infer approach speed or jump readiness from this guide."
  },
  {
    id: "pumping",
    name: "Pumping",
    level: "Intermediate",
    category: "Air Skills",
    summary: "Match your movement to gentle rollers so the bike follows the ground smoothly.",
    prerequisites: ["attack-position", "body-bike-separation", "controlled-descents"],
    setting: "A beginner pump-track section with rollable features and no conflicting traffic.",
    drill: [
      "Inspect the track and roll the section without trying to gain speed.",
      "Let your arms and legs follow the shape of each roller.",
      "Repeat a smooth rhythm before adding deliberate pumping with coaching feedback."
    ],
    checks: ["My wheels follow the terrain rather than bouncing.", "I retain enough control to slow or stop after the section."],
    safety: "Use the designated track direction, leave space to other riders, and keep both wheels on the ground while learning."
  },
  {
    id: "trail-scanning",
    name: "Scanning",
    level: "Beginner",
    category: "Trail Reading",
    summary: "Notice turns, grip changes, exits, and other trail users before they demand a reaction.",
    prerequisites: ["riding-vision", "braking-control"],
    setting: "A familiar, easy trail with good visibility.",
    drill: [
      "At a relaxed pace, look for the next turn or change in surface.",
      "Identify a clear line and a safe place to slow down before reaching it.",
      "Stop after a short section and recall what you noticed."
    ],
    checks: ["I notice changes before they are under my front wheel.", "I leave room to respond to other trail users."],
    safety: "Keep awareness of nearby ground as well as the trail ahead. Slow down when visibility is limited."
  },
  {
    id: "anticipation",
    name: "Anticipation",
    level: "Intermediate",
    category: "Trail Reading",
    summary: "Use what you see to prepare your speed, position, and options before the next feature.",
    prerequisites: ["trail-scanning", "controlled-descents"],
    setting: "A familiar, easy section with visible turns and predictable surface changes.",
    drill: [
      "Before a short section, identify the next change and what preparation it needs.",
      "Make your adjustments early while maintaining a comfortable pace.",
      "Stop and compare what you expected with what actually happened."
    ],
    checks: ["I prepare before reaching the feature.", "I keep an alternative when conditions differ from my expectation."],
    safety: "An expectation is not a guarantee. Reassess blind corners, changing grip, and other trail users every time."
  },
  {
    id: "line-choice",
    name: "Line selection",
    level: "Intermediate",
    category: "Trail Reading",
    summary: "Compare lines by their grip, visibility, stopping options, and exits.",
    prerequisites: ["trail-scanning"],
    setting: "A familiar, easy trail section that can be inspected without blocking others.",
    drill: [
      "Stop safely and identify two possible lines through a short section.",
      "Compare their grip, sight lines, stopping options, and exits.",
      "Ride the more manageable line and reflect on why it worked."
    ],
    checks: ["I explain my choice in terms of control rather than speed.", "I can change plans before committing."],
    safety: "Stay on permitted trail surfaces and yield while inspecting or practicing."
  },
  {
    id: "riding-confidence",
    name: "Confidence",
    level: "Beginner",
    category: "Mindset",
    summary: "Build confidence from repeatable, controlled experiences rather than pressure to attempt more.",
    prerequisites: [],
    setting: "A familiar, low-consequence practice area where stopping or walking is easy.",
    drill: [
      "Choose one small movement that is already within your control.",
      "Repeat it without increasing difficulty and notice what feels dependable.",
      "Finish by noting one useful cue and one boundary you want to respect."
    ],
    checks: ["My confidence reflects repeatable control, not encouragement alone.", "I can say no to a feature without treating it as failure."],
    safety: "Confidence is not proof of readiness. Step back when tired, pressured, or uncertain, and seek suitable coaching."
  },
  {
    id: "consistency",
    name: "Consistency",
    level: "Beginner",
    category: "Mindset",
    summary: "Repeat useful habits and recognize reliable technique instead of judging one good attempt.",
    prerequisites: ["riding-confidence"],
    setting: "A familiar practice area with a simple, repeatable exercise.",
    drill: [
      "Choose one manageable skill and one clear cue to focus on.",
      "Repeat a short set with breaks, keeping the conditions and challenge similar.",
      "Note what stayed dependable and stop before fatigue changes the movement."
    ],
    checks: ["I can describe a repeatable cue rather than a lucky outcome.", "I notice when fatigue or conditions change my control."],
    safety: "More repetitions are not always better. Take breaks and stop when focus or movement quality declines."
  },
  {
    id: "decision-making",
    name: "Decision-making",
    level: "Beginner",
    category: "Mindset",
    summary: "Choose whether to ride, inspect, walk, or stop based on conditions and your current control.",
    prerequisites: ["trail-scanning", "riding-confidence"],
    setting: "A familiar trail with safe places to stop and inspect features.",
    drill: [
      "Stop before a feature and check the surface, exit, fatigue, and available alternatives.",
      "Choose a ride, walk, or ride-around option without pressure to commit.",
      "Afterward, review the quality of your decision rather than the difficulty of the feature."
    ],
    checks: ["I decide before entering a feature.", "I can change my plan when conditions or my focus change."],
    safety: "Respect closures, other trail users, and your own limits. Walking or ending a ride is a valid decision."
  }
];

const SKILL_CATALOG_BY_ID = new Map(SKILL_CATALOG.map((skill) => [skill.id, skill]));
const LEGACY_SKILL_LINKS = [
  { name: "Ready position & balance", category: "Bike control", level: "Beginner", catalogueId: "ready-position" },
  { name: "Braking control", category: "Braking", level: "Beginner", catalogueId: "braking-control" },
  { name: "Cornering", category: "Cornering", level: "Beginner", catalogueId: "flat-cornering" },
  { name: "Line choice", category: "Trail judgment", level: "Intermediate", catalogueId: "line-choice" }
];
