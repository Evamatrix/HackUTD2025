from datastorage import datastorage
from transactionClass import transactionClass
from newsHandler import newsHandler  

def main():
    storage = datastorage()
    transaction_service = transactionClass()
    api_key = "ct1nmb9r01qoprggpfk0ct1nmb9r01qoprggpfkg" 
    news_service = newsHandler(api_key)

    while True:
        print("\n--- Welcome to the Login System ---")
        print("1. Register a new account")
        print("2. Login")
        print("3. Exit")
        choice = input("Choose an option (1/2/3): ")

        if choice == '1':
            username = input("Enter a new username: ")
            password = input("Enter a new password: ")
            if storage.register_user(username, password):
                print("Registration successful!")
            else:
                print("Username already exists. Please choose a different one.")

        elif choice == '2':
            username = input("Enter your username: ")
            password = input("Enter your password: ")

            if storage.validate_login(username, password):
                print("Login successful! Welcome, " + username)
                while True:
                    print("\n--- User Dashboard ---")
                    print("1. Follow a congressman")
                    print("2. View followed congressmen")
                    print("3. Interactive Query")
                    print("4. View News")
                    print("5. Logout")
                    user_choice = input("Choose an option (1/2/3/4/5): ")

                    if user_choice == '1':
                        all_congressmen = storage.list_all_congressmen()
                        print("\nAvailable Congressmen:")
                        for idx, name in enumerate(all_congressmen, start=1):
                            print(f"{idx}. {name}")
                        choice = input("Enter the number of the congressman to follow: ")
                        if choice.isdigit() and 1 <= int(choice) <= len(all_congressmen):
                            congressman = all_congressmen[int(choice) - 1]
                            if storage.follow_congressman(username, congressman):
                                # Fetch recent trades and display them
                                print(f"\nRecent trades for {congressman}:")
                                transaction_service.get_recent_trades(congressman)
                            else:
                                print("Failed to follow congressman.")
                        else:
                            print("Invalid choice.")

                    elif user_choice == '2':
                        followed = storage.get_followed_congressmen(username)
                        if followed:
                            print("\nYou are following:")
                            for name in followed:
                                print(name)
                                print(f"\nRecent trades for {name}:")
                                transaction_service.get_recent_trades(name)
                        else:
                            print("\nYou are not following any congressmen.")

                    elif user_choice == '3':
                        transaction_service.interactive_query()

                    elif user_choice == '4':
                        category = input("Enter news category (e.g., general, stocks): ")
                        news = news_service.getNews(category)
                        if news:
                            print("\nRecent News:")
                            news_service.show(news)
                        else:
                            print("No news available for this category.")

                    elif user_choice == '5':
                        print("Logging out. Goodbye!")
                        break

                    else:
                        print("Invalid choice. Please enter a valid option.")
            else:
                print("Invalid username or password. Please try again.")

        elif choice == '3':
            print("Exiting the system. Goodbye!")
            break

        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
