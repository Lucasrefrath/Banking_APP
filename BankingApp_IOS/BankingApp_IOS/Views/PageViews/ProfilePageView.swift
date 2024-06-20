//
//  ProfilePage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct ProfilePageView: View {
    
    @AppStorage("SESSION_COOKIE") private var sessionCookie = ""
    
    func nothing() -> Void {
        print("test")
    }
    
    var body: some View {

        Form {
            Section{
                HStack(spacing: 20) {
                    Image(systemName: "person.circle.fill")
                        .resizable()
                        .frame(width: 75, height: 75)
                        .scaledToFit()
                    
                    VStack(alignment: .leading){
                        Text("Lucas Hermes")
                        Text(AuthenticationContextHolder.shared.userDetails.username)
                            .font(.footnote)
                    }
                    
                    Spacer()
                    
                    Image(systemName: "chevron.right")
                        .padding()
                }
            }
            
            Section ("Roles") {
                ForEach(AuthenticationContextHolder.shared.userDetails.roles, id: \.self) { role in
                        Text(role)
                }
            }
            
            Section("Authentication") {
                LabeledContent("API-Token") {
                    Text("6f9bsf0g210g8d")
                }
                
                Button(action: nothing) {
                    Text("Logout")
                        .foregroundColor(.red)
                }
                
            }
        }
    }
}

#Preview {
    ProfilePageView()
}
