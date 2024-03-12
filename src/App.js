import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import "./App.css";
import gsap from "gsap";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showYesModal, setShowYesModal] = useState(false);
  const [showYesModal2, setShowYesModal2] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedConfirmation, setSelectedConfirmation] = useState("");
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [showNoButton, setShowNoButton] = useState(true);

  const handleLoaded = () => setLoading(false);

  const handleYesClick = () => setShowYesModal(true);

  const handleNoClick = () => setShowNoModal(true);

  const handleCloseNoModal = () => {
    setShowNoModal(false);
    setShowNoButton(false); // Обновляем состояние, чтобы кнопка "No" больше не отображалась.
  };
  

  const handleConfirmationOk = () => {
    setShowConfirmationModal(false); // Скрываем модальное окно подтверждения
    setIsFormSubmitted(true); 
  };

  const handleSubmit = (activityType = selectedActivity) => {
    // fetch("https://dating-backend-7wgg.onrender.com/saveAnswer", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ activity: activityType }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("success", data);
    //     setSelectedConfirmation(activityType);
    //     setShowConfirmationModal(true);
        
    //   })
    //   .catch((error) => console.log("error", error));
      setIsFormSubmitted(true); // Убедитесь, что это состояние обновляется здесь
    setShowYesModal(false);
    setShowYesModal2(false);
    setShowPlanDetails(false); // Опционально скрываем детали плана здесь или оставляем видимыми, если нужно
  };
  

  useEffect(() => {
    if (isFormSubmitted)
      gsap.from(".loader2", { opacity: 0, y: 80, duration: 2 });
  }, [isFormSubmitted]);

  return (
    <div className="app">
      {loading && <Loader onLoaded={handleLoaded} />}
      {(showYesModal ||
        showNoModal ||
        showConfirmationModal ||
        showYesModal2) && <div className="overlay"></div>}

      {!loading && !isFormSubmitted && !showPlanDetails && (
        <div className="invite">
          <h1>Здраво, Neven!</h1>
          <p>We first met on February 18</p>
          <p>and spent 9 exciting hours together.</p>
          <p>
            Would you like to spend another 8 interesting hours on March 17?
          </p>
          <h3>
            PS: I guess Monday 18 is not the best choice, so let's just move
            the date )))
          </h3>
          <div className="buttons">
            <button onClick={handleYesClick}>Yes</button>
            {showNoButton && <button className="blue" onClick={handleNoClick}>No</button>}
          </div>
        </div>
      )}

      {showPlanDetails && (
        <div className="plan-details">
          <h2>Here is the plan for our trip:</h2>
          <h2>Alpacas + Zbiroh Castle 17.03 🦙</h2>
          <p>
            We're leaving at 9:00 from the main Prague train station. The farm
            is an hour's drive away
          </p>
          <p>We'll return to Prague at 17:00</p>
          <p>
            We'll visit a family farm, where we'll meet these adorable animals
            and more 🥰 There will be a treat for us at the farm made from
            homegrown products. We'll be taught how to weave from alpaca wool.
            But the main attraction is interacting with these sweet and gentle
            animals 😌 We will also visit Zbiroh Castle.
          </p>
          <button
            className="submit-btn"
            onClick={() => {
              const activityType = "details of the trip";
              handleSubmit(activityType); // Передаем конкретный тип действия в handleSubmit
              setShowPlanDetails(false); // По желанию скрываем детали плана
            }}
          >
            Upiiiii )))
          </button>
        </div>
      )}

      {isFormSubmitted && (
        <div className="loader2">
          <p>I am looking forward to our meeting on Sunday 17! </p>
          <p>
            <strong>8:40 Praha hlavní nádraží</strong>
          </p>
          <h3>PS: And we could also meet earlier of course)))</h3>

          <img src="./alpaka2.jpg" alt="Awaiting eagerly" />
        </div>
      )}

      {showYesModal && (
        <div className="modal">
          <h2>Great! Want to know the details? </h2>
        <div className="buttons">
        <button
            className="submit-btn"
            onClick={() => {
              setShowYesModal(false); // Скрываем модальное окно
              setShowPlanDetails(true); // Показываем детали плана
            }}
          >
            Yes, show the plan!
          </button>
          <button
            className="submit-btn blue"
            onClick={() => {
              setShowYesModal(false);
              setShowYesModal2(true);
            }}
          >
            No, surprise me
          </button>

        </div>
         
        </div>
      )}

      {showYesModal2 && (
        <div className="modal">
          <h2>Are you sure you don't want to know where we're going? )))</h2>
        <div className="buttons">
        <button
            className="submit-btn blue"
            onClick={() => {
              setSelectedActivity("surprise"); // Устанавливаем активность в "surprise"
              setShowYesModal2(false); // Закрываем модальное окно
              handleSubmit("surprise"); // Вызываем handleSubmit напрямую для отправки данных
            }}
          >
            I am sure! I want a surprise!
          </button>
          <button
            className="submit-btn"
            onClick={() => {
              setShowYesModal(false); // Скрываем модальное окно
              setShowYesModal2(false);
              setShowPlanDetails(true); // Показываем детали плана
            }}
          >
            Ok, ok, show the details
          </button>
        </div>
         
        </div>
      )}

      {showNoModal && (
        <div className="modal">
          <h2>Don't even think about it)))</h2>
          <button onClick={handleCloseNoModal}>Close</button>
        </div>
      )}

      {showConfirmationModal && (
        <div className="modal">
          <p>Thanks, you've chosen: {selectedConfirmation}</p>
          <button onClick={handleConfirmationOk}>OK</button>
        </div>
      )}
    </div>
  );
};

export default App;
