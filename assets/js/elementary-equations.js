(() => {
  document.querySelectorAll(".equation-demo").forEach((demo) => {
    const steps = Array.from(demo.querySelectorAll(".demo-step"));
    const controls = demo.querySelector(".step-controls");
    const progress = controls.querySelector(".step-progress");
    const previous = controls.querySelector('[data-action="previous"]');
    const next = controls.querySelector('[data-action="next"]');
    const reset = controls.querySelector('[data-action="reset"]');
    let currentStep = 0;

    const showStep = () => {
      const focusedButton = controls.querySelector("button:focus");
      steps.forEach((step, index) => {
        step.hidden = index !== currentStep;
      });
      const title = steps[currentStep].querySelector("h4").textContent;
      progress.textContent = `${currentStep + 1} / ${steps.length} · ${title}`;
      previous.disabled = currentStep === 0;
      next.disabled = currentStep === steps.length - 1;
      reset.disabled = currentStep === 0;
      // 禁用当前按钮会丢失键盘焦点，改交给仍可操作的相邻按钮。
      if (focusedButton?.disabled) {
        (currentStep === 0 ? next : previous).focus();
      }
    };

    previous.addEventListener("click", () => {
      currentStep -= 1;
      showStep();
    });
    next.addEventListener("click", () => {
      currentStep += 1;
      showStep();
    });
    reset.addEventListener("click", () => {
      currentStep = 0;
      showStep();
    });

    showStep();
    controls.hidden = false;
  });
})();
