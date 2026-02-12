# Drift Diffusion Model (DDM) Simulator

An interactive web-based simulator for understanding decision-making through the Drift Diffusion Model, a cornerstone framework in cognitive neuroscience and mathematical psychology.

## 🎯 What is the Drift Diffusion Model?

The Drift Diffusion Model explains how humans (and other animals) make simple two-alternative forced-choice decisions. Think of it as a model of how evidence accumulates in your brain until you reach a decision threshold.

### Real-World Example

Imagine you're at a crosswalk deciding whether to cross the street:

- **Evidence accumulation**: You're continuously gathering information (car distances, speeds, traffic light state)
- **Drift**: The overall tendency based on evidence (more cars = drift toward "don't cross")
- **Noise**: Uncertainty in your perception (is that car slowing down?)
- **Boundary**: Your decision threshold (when you're confident enough to cross or stay)
- **Bias**: Prior expectations (if you're late, you might be biased toward crossing)

---

## 📊 The Model Parameters

### 1. **Boundary Height (a)** — Response Caution

```
Higher boundary = More careful = Slower but more accurate
Lower boundary = Impulsive = Faster but more errors
```

**Intuition**: This represents how much evidence you need before making a decision.

- **High boundary**: You're like a scientist demanding overwhelming evidence
- **Low boundary**: You're like someone making a snap judgment

**Real-world parallel**:

- Medical diagnosis (high boundary needed)
- Choosing which snack to pick from a plate (low boundary acceptable)

---

### 2. **Drift Rate (v)** — Evidence Strength

```
Positive drift = Evidence favors upper boundary (correct)
Negative drift = Evidence favors lower boundary (incorrect)
Zero drift = No clear evidence (random walk)
```

**Intuition**: This is the quality or strength of the evidence you're receiving.

- **Strong positive drift**: Like reading clear text on a screen
- **Weak drift**: Like reading faded, blurry text
- **Negative drift**: Like being shown misleading information

**Important insight**:

- High drift → Fast AND accurate decisions
- Low drift → Slow AND error-prone decisions

---

### 3. **Bias (z)** — Starting Point

```
z = 0.5 → Unbiased (start in the middle)
z > 0.5 → Biased toward upper boundary
z < 0.5 → Biased toward lower boundary
```

**Intuition**: This captures your prior expectations or pre-judgment.

- **No bias (0.5)**: Coin flip mentality, no expectation
- **High bias (0.7)**: You're already leaning toward one answer before seeing evidence

**Real-world example**:

- If you hear a loud bang during Diwali, you think of a firecracker (not a gunshot)
- That's a bias toward the more common explanation

**Key insight**: Bias speeds up decisions when you're right, but makes errors more likely when you're wrong!

---

### 4. **Noise (s)** — Perceptual Uncertainty

```
Low noise = Reliable perception
High noise = Unreliable perception
```

**Intuition**: This represents moment-to-moment variability in evidence accumulation.

- **Low noise**: Like measuring with a precise instrument
- **High noise**: Like trying to estimate distance in fog

**Why it matters**: Noise is what makes decisions probabilistic rather than deterministic. Even with the same drift rate, noise ensures you won't always make the same decision.

---

## 🧠 Core Insights from the Model

### 1. **Speed-Accuracy Tradeoff**

The DDM elegantly explains why faster decisions are typically less accurate:

- Lower boundary → faster decisions but more errors
- Higher boundary → slower decisions but fewer errors

You can't have both maximum speed AND maximum accuracy!

### 2. **Evidence Accumulation is Noisy**

Decision-making isn't a smooth process. The model shows that evidence accumulates with random fluctuations (the wiggly paths you see). This explains:

- Why you sometimes change your mind mid-decision
- Why identical situations can lead to different choices
- Why reaction times vary even for the same stimulus

### 3. **Errors Aren't Random**

The model predicts that:

- **Errors are faster on average** (hit boundary before enough evidence accumulates)
- **Correct responses are slower** (need more time to gather sufficient evidence)
- **Exceptions exist**: With high bias toward the wrong answer, errors can be slow!

### 4. **The Two Sources of Response Time**

```
Reaction Time = Decision Time + Non-decision Time

Decision Time: Time to accumulate evidence (modeled by DDM)
Non-decision Time: Perception + Motor response (not modeled here)
```

---

## 🎮 How to Use the Simulator

### Running Simulations

1. **Adjust Parameters** using the sliders:
   - Start with default values to see typical behavior
   - Change one parameter at a time to see its effect

2. **Run Trials** using the "Run 1 Trial" button:
   - Each trial shows a single evidence accumulation path
   - Colors indicate which boundary was hit:
     - **Blue** = Upper boundary (correct response)
     - **Gold/Brown** = Lower boundary (incorrect response)

3. **Observe Patterns**:
   - Watch how paths drift upward (positive v) or downward (negative v)
   - Notice the random wiggling (noise)
   - See how starting point (bias) affects outcomes

### Experiments to Try

#### Experiment 1: Speed-Accuracy Tradeoff

1. Set: v=0.5, z=0.5, s=0.1
2. Try a=0.5 → Run 20 trials → Note accuracy
3. Try a=1.5 → Run 20 trials → Note accuracy
4. **Observation**: Higher boundary = slower but more accurate

#### Experiment 2: Effect of Drift

1. Set: a=1.0, z=0.5, s=0.1
2. Try v=0.1 → Run 20 trials
3. Try v=1.0 → Run 20 trials
4. **Observation**: Stronger drift = faster AND more accurate

#### Experiment 3: The Power of Bias

1. Set: a=1.0, v=0.3, s=0.1
2. Try z=0.5 → Run 20 trials
3. Try z=0.8 → Run 20 trials
4. **Observation**: Bias speeds correct responses but increases errors

#### Experiment 4: Noise Effects

1. Set: a=1.0, v=0.5, z=0.5
2. Try s=0.05 → Run 20 trials
3. Try s=0.25 → Run 20 trials
4. **Observation**: More noise = more variability, longer times

---

## 📈 Interpreting the Visualizations

### Upper Panel: Evidence Accumulation Paths

- **X-axis**: Time (arbitrary units)
- **Y-axis**: Evidence level (from 0 to boundary a)
- **Red lines**: Decision boundaries
- **Colored paths**: Evidence accumulation over time
  - Upward drift = positive evidence
  - Crosses top = correct decision
  - Crosses bottom = incorrect decision

### Lower Panel: Reaction Time Distributions

- **Blue histogram (top)**: RT distribution for correct responses
- **Gold histogram (bottom)**: RT distribution for errors
- **Width**: Spread indicates variability
- **Peak position**: Average reaction time

**What to look for**:

- Error distributions typically peak earlier (faster errors)
- Correct distributions are usually more spread out
- With strong drift, distributions separate clearly

---

## 🔬 Applications in Research

The DDM is used to understand:

1. **Perceptual Decision Making**
   - How quickly can radiologists spot tumors?
   - When do people detect motion in noisy video?

2. **Value-Based Decisions**
   - Consumer choices (buy vs. don't buy)
   - Economic decisions under uncertainty

3. **Clinical Populations**
   - ADHD: Lower boundaries (impulsive decisions)
   - Anxiety: Higher boundaries (excessive caution)
   - Parkinson's: Altered drift rates (slowed evidence accumulation)

4. **Cognitive Aging**
   - Older adults often show: higher boundaries (more cautious) and slower drift rates

5. **Neural Mechanisms**
   - Mapping model parameters to brain regions
   - Drift rate ↔ Sensory cortex quality
   - Boundary ↔ Frontal-striatal networks
   - Bias ↔ Prior expectations in prefrontal cortex

---

## 💡 Key Takeaways for Your Workshop

1. **The DDM is elegant and powerful**: Four simple parameters explain complex decision behavior

2. **Predictions are quantitative**: Not just qualitative trends, but actual RT distributions and accuracy rates

3. **It's testable**: Can be fit to behavioral data to infer latent cognitive processes

4. **It bridges levels**: Connects behavior to cognitive processes to neural mechanisms

5. **Practical applications**: From UX design to clinical diagnosis to AI systems

6. **Limitations exist**: Best for simple, binary, speeded decisions (not strategic choices)

---

## 🚀 Extensions and Advanced Topics

The basic DDM can be extended with:

- **Non-decision time (Ter)**: Add constant for perception + motor response
- **Inter-trial variability**: Parameters vary trial-to-trial
- **Collapsing boundaries**: Urgency increases over time
- **Time-varying drift**: Evidence quality changes during trial
- **Leaky integration**: Evidence decays over time
- **Multi-alternative decisions**: Race models or advantage models

---

## 📚 Further Reading

### Foundational Papers

1. Ratcliff, R. (1978). A theory of memory retrieval. *Psychological Review*, 85(2), 59-108.
2. Ratcliff, R., & McKoon, G. (2008). The diffusion decision model: Theory and data. *Neural Computation*, 20(4), 873-922.

### Reviews and Tutorials

3. Forstmann, B. U., et al. (2016). Sequential sampling models in cognitive neuroscience. *Annual Review of Neuroscience*, 39, 385-409.
2. Krajbich, I., et al. (2015). Multialternative drift-diffusion model. *Psychological Review*, 122(1), 148-165.

### Applications

5. White, C. N., et al. (2010). Diffusion models of the flanker task. *Journal of Experimental Psychology*, 36(4), 1055-1065.
2. Mulder, M. J., et al. (2012). Bias in the brain: *PLoS ONE*, 7(4), e35836.

---

## 📝 Workshop Exercises

### Exercise 1: Parameter Recovery

1. Choose secret parameters (don't reveal to partner)
2. Run 50 trials
3. Have partner guess your parameters by observation
4. Reveal and compare

### Exercise 2: Real-World Mapping

For each scenario, specify appropriate DDM parameters:

- Emergency room doctor diagnosing chest pain
- Professional gamer making split-second decisions
- Jury deciding guilty vs. not guilty
- Security officer scanning luggage X-rays

### Exercise 3: Design Your Own Study

Choose a research question and describe:

- What decision task would you use?
- Which parameter would you manipulate?
- What would you predict?
- How would you test it?

---

## 🤝 Credits

This simulator was created for educational purposes to demonstrate the Drift Diffusion Model in an interactive, intuitive way.

**Based on work by**:

- Roger Ratcliff (original DDM formulation)
- Birte Forstmann (cognitive neuroscience applications)
- Many contributors to the decision-making literature

---

Happy exploring! The best way to understand the DDM is to play with it. Try extreme parameter values, run lots of trials, and observe the patterns. The model is simple, but its implications are profound.
