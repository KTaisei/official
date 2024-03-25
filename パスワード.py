import random
import string

def generate_password(length, use_digits, use_uppercase, use_lowercase, use_symbols):
    characters = ''
    if use_lowercase:
        characters += string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_digits:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation

    if not characters:
        print("Error: No character set selected.")
        return None

    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def get_user_input():
    length = int(input("パスワードの長さを入力してください: "))
    use_digits = input("数字を含めますか？ (y/n): ").lower() == 'y'
    use_uppercase = input("大文字を含めますか？ (y/n): ").lower() == 'y'
    use_lowercase = input("小文字を含めますか？ (y/n): ").lower() == 'y'
    use_symbols = input("記号を含めますか？ (y/n): ").lower() == 'y'
    return length, use_digits, use_uppercase, use_lowercase, use_symbols

def main():
    print("パスワード生成プログラムにようこそ！")
    length, use_digits, use_uppercase, use_lowercase, use_symbols = get_user_input()
    generated_password = generate_password(length, use_digits, use_uppercase, use_lowercase, use_symbols)
    if generated_password:
        print("Generated Password:", generated_password)

if __name__ == "__main__":
    main()
